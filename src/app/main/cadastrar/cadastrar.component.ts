import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CadastrarService } from './cadastrar.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    DatePickerModule,
    DropdownModule,
    ReactiveFormsModule,
    CommonModule,
    SelectModule,
    ConfirmPopupModule,
    Toast,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
})
export class CadastrarComponent {
  form: FormGroup;
  emEdicao = false;

  opcoesBatizado = [
    { label: 'Sim', value: 'S' },
    { label: 'Não', value: 'N' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private cadastrarService: CadastrarService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      nome: [''],
      aniversario: [null],
      endereco: [''],
      batizadoAguas: [''],
      batizadoEspirito: [''],
    });

    this.route.queryParams.subscribe((membro: any) => {
      if (membro.nome) {
        this.emEdicao = true;

        this.form.patchValue(membro);

        const [day, month, year] = membro.aniversario.split('/');
        const date = new Date(+year, +month - 1, +day);
        this.form.get('aniversario')?.setValue(date);
        this.form.addControl('id', this.fb.control(+membro.id));
        switch (membro.batismo) {
          case 'AE':
            this.form.get('batizadoAguas')?.setValue('S');
            this.form.get('batizadoEspirito')?.setValue('S');
            break;
          case 'A':
            this.form.get('batizadoAguas')?.setValue('S');
            this.form.get('batizadoEspirito')?.setValue('N');
            break;
          case 'E':
            this.form.get('batizadoAguas')?.setValue('N');
            this.form.get('batizadoEspirito')?.setValue('S');
            break;
          default:
            this.form.get('batizadoAguas')?.setValue('N');
            this.form.get('batizadoEspirito')?.setValue('N');
            break;
        }
      }
    });
  }

  cadastrarAtualizar(atualizar?: boolean) {
    this.form
      .get('aniversario')
      ?.setValue(
        this.form.get('aniversario')?.value.toLocaleDateString('pt-BR')
      );

    console.log(this.form.getRawValue());

    this.form.addControl('batismo', this.fb.control(this.getBatismoStatus()));
    this.form.removeControl('batizadoAguas');
    this.form.removeControl('batizadoEspirito');

    if (atualizar) {
      this.cadastrarService
        .atualizar(this.form.getRawValue(), this.form.get('id')?.value)
        .subscribe((value: any) => {
          if (value.message) {
            this.router.navigate(['/listar']);
            setTimeout(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Abençoado(a) atualizado(a) com sucesso! 🎉',
              });
            }, 1000);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Algo não ocorreu como esperado 😞',
            });
          }
        });
      return;
    }
    this.cadastrarService
      .cadastrar(this.form.getRawValue())
      .subscribe((value: any) => {
        if (value.message) {
          this.router.navigate(['/listar']);
          setTimeout(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Abençoado(a) cadastrado(a) com sucesso! 🎉',
            });
          }, 1000);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Algo não ocorreu como esperado 😞',
          });
        }
      });
  }

  getBatismoStatus(): string {
    const batizadoAguas = this.form.get('batizadoAguas')?.value;
    const batizadoEspirito = this.form.get('batizadoEspirito')?.value;

    if (batizadoAguas === 'S' && batizadoEspirito === 'S') {
      return 'AE';
    } else if (batizadoAguas === 'S' && batizadoEspirito === 'N') {
      return 'A';
    } else if (batizadoAguas === 'N' && batizadoEspirito === 'S') {
      return 'E';
    } else {
      return 'N';
    }
  }

  deletar(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente excluir?',
      icon: 'pi pi-exclamation-circle',
      rejectButtonProps: {
        icon: 'pi pi-times',
        label: 'Não',
        outlined: true,
      },
      acceptButtonProps: {
        icon: 'pi pi-check',
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        this.cadastrarService
          .deletar(this.form.get('id')?.value)
          .subscribe((value: any) => {
            if (value.message) {
              this.router.navigate(['/listar']);
              setTimeout(() => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Abençoado(a) deletado(a) com sucesso! 🎉',
                });
              }, 1000);
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Algo não ocorreu como esperado 😞',
              });
            }
          });
      },
      reject: () => {},
    });
  }

  cancelar(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente cancelar?',
      icon: 'pi pi-exclamation-circle',
      rejectButtonProps: {
        icon: 'pi pi-times',
        label: 'Não',
        outlined: true,
      },
      acceptButtonProps: {
        icon: 'pi pi-check',
        label: 'Sim',
        severity: 'danger',
      },
      accept: () => {
        this.router.navigate(['/listar']);
      },
      reject: () => {},
    });
  }
}
