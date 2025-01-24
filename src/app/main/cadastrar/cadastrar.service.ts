import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastrarService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  cadastrar(data: any) {
    return this.httpClient.post(`${this.apiUrl}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  atualizar(data: any, id: number) {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  deletar(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
