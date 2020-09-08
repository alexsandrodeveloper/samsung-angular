import {Injectable} from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

import {Result} from './result.model'

import {SAM_EVALUATION_API} from '../app.api'

@Injectable()
export class ResultService{

  API_Login: string = `${SAM_EVALUATION_API}/auth/signin`

  constructor(private httpClient: HttpClient){}

  results(): Observable<Result[]>{

    var token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbXSwiaWF0IjoxNTk5NTEzNjk2LCJleHAiOjE1OTk1MTcyOTZ9.cO0P9EkNGFA3vhngihrsksi3QAY5gtkgZEDh1msKrdg'


    let headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', 'http://localhost:4200')
      .set('Authorization', token)

    // Headers
    let options = { headers: headers }

    return this.httpClient.get<Result[]>(`${SAM_EVALUATION_API}/api/evaluation/v1/resultados`, options)
         .pipe(
           retry(2),
           catchError(this.handleError))
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
   let errorMessage = '';
   if (error.error instanceof ErrorEvent) {
     // Erro ocorreu no lado do client
     errorMessage = error.error.message;
   } else {
     // Erro ocorreu no lado do servidor
     errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
   }
   console.log(errorMessage);
   return throwError(errorMessage);
 };

}
