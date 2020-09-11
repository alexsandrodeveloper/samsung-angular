import {Injectable} from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { Result } from './result.model'
import { Filtro } from '../search/filtro.model'
import { Currency } from '../search/currency.model'

import {SAM_EVALUATION_API} from '../app.api'

@Injectable()
export class ResultService{

  public token: string;

  private API_LOGIN: string = `${SAM_EVALUATION_API}/api/auth/signin`
  private API_RESULTADOS: string = `${SAM_EVALUATION_API}/api/evaluation/v1/resultados/filtrar`
  private API_CURRENCIES: string = `${SAM_EVALUATION_API}/api/evaluation/v1/currency`

  constructor(private httpClient: HttpClient){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<any> {

    var headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
     });

     // Headers
     let options = { headers: headers }

     return this.httpClient.post<any>(this.API_LOGIN, { username: username, password: password }, options)
      .pipe(
        map(user => {
          // login bem-sucedido se houver um token jwt na resposta
          if (user && user.token) {
            // armazenar detalhes do usuário e token jwt no localStorage para manter o usuário logado entre as atualizações da página
            localStorage.setItem('token', JSON.stringify(user.token));
          }
          return user;
        })
      );
  }

  logout(): void {
    // Limpa o token removendo o usuário do local store para efetuar o logout
    this.token = null;
    localStorage.removeItem('token');
  }

  results(filtro: Filtro): Observable<Result[]>{

    var headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT'
     });

     let params = new HttpParams();
     params = params.append('numeroDocumento', filtro.numeroDocumento);
     params = params.append('tipoMoeda', filtro.tipoMoeda);
     params = params.append('dataInicio', filtro.dataInicio);
     params = params.append('dataFim', filtro.dataFim);

    // Headers
    let options = { headers: headers , params: params }

    return this.httpClient.get<Result[]>(this.API_RESULTADOS, options)
          .pipe(
            retry(2),
            catchError(this.handleError))
  }

  getCurrency(): Observable<Currency[]>{

    var headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
     });

     // Headers
     let options = { headers: headers }

     return this.httpClient.get<Currency[]>(this.API_CURRENCIES, options)
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
