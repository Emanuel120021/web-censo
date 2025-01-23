import { state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ListarService } from './listar.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss',
})
export class ListarComponent implements OnInit {
  dataSource: any;
  constructor(private router: Router, private listarService: ListarService) {}
  // Legenda para o dataSource:
  // AE = AGUA E ESPIRITO || N = NENHUM || A = AGUA || E = ESPIRITO
  // dataSource = [
  //   {
  //     nome: 'Emanuel Lázaro Porpino Campos',
  //     endereco: 'Rua Antônio Carlos Sobrinho, 200, Liberdade',
  //     aniversario: '22/01/2001',
  //     batismo: 'AE',
  //   },
  //   {
  //     nome: 'Emanuel Lázaro Porpino Campos',
  //     endereco: 'Rua Antônio Carlos Sobrinho, 200, Liberdade',
  //     aniversario: '22/01/2001',
  //     batismo: 'N',
  //   },
  //   {
  //     nome: 'Emanuel Lázaro Porpino Campos',
  //     endereco: 'Rua Antônio Carlos Sobrinho, 200, Liberdade',
  //     aniversario: '22/01/2001',
  //     batismo: 'A',
  //   },
  //   {
  //     nome: 'Emanuel Lázaro Porpino Campos',
  //     endereco: 'Rua Antônio Carlos Sobrinho, 200, Liberdade',
  //     aniversario: '22/01/2001',
  //     batismo: 'E',
  //   },
  // ];

  ngOnInit() {
    this.listarService.listar().subscribe((res) => {
      this.dataSource = res;
    });
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
