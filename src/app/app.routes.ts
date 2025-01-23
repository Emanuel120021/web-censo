import { Routes } from '@angular/router';
import { ListarComponent } from './main/listar/listar.component';
import { CadastrarComponent } from './main/cadastrar/cadastrar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: 'listar', component: ListarComponent },
  { path: 'cadastrar', component: CadastrarComponent },
];
