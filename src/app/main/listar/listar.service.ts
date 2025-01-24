import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListarService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  listar() {
    return this.httpClient.get(`${this.apiUrl}`);
  }
}
