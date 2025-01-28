import { LoadingService } from './../../loading/loading.service';
import { state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ListarService } from './listar.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [TableModule, CommonModule, NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss',
})
export class ListarComponent implements OnInit {
  dataSource: any;

  mensagem: string | null = null;
  private subscription: Subscription | undefined;
  constructor(
    private router: Router,
    private listarService: ListarService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.listarService.listar().subscribe((res) => {
      this.dataSource = res;
    });
    this.subscription = this.loadingService.mensagem$.subscribe((mensagem) => {
      console.log('Mensagem recebida no componente:', mensagem);
      this.mensagem = mensagem; // Atualiza a mensagem exibida
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getRowClass(batismo: string): string {
    switch (batismo) {
      case 'AE':
        return 'ae';
      case 'N':
        return 'n';
      case 'A':
        return 'a';
      case 'E':
        return 'e';
      default:
        return '';
    }
  }

  routeCadastrar(membro: any) {
    this.router.navigate(['cadastrar'], { queryParams: membro });
  }
}
