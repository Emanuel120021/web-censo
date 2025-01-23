import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web-censo';
  constructor(private router: Router) {}

  routeListar() {
    this.router.navigate(['listar']);
  }

  routeCadastrar() {
    this.router.navigate(['cadastrar']);
  }
}
