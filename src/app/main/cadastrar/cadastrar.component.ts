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
  ],
  providers: [ConfirmationService],
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
    private confirmationService: ConfirmationService
  ) {
    this.form = this.fb.group({
      id: [''],
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
      accept: () => {},
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
