import { ErroHandlerService } from './../core/erro-handler.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  jwtPayload: any;

  cacheRequest: Array<HttpRequest<any>> = [];

  constructor(private http: HttpClient,
              private erroHandlerService: ErroHandlerService) {

    this.carregaToken();
    this.getToken();

  }

  async login(usuario: string, senha: string): Promise<void> {

    const bory = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, bory, { withCredentials: true })
      .toPromise()
      .then(response => {

        const responseJson = JSON.stringify(response);
        this.decodificaEArmazenarToken(responseJson);

      })
      .catch(response => {
        if (response.status === 400) {

          if (response.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }

        }
        return Promise.reject(response);
      });
  }

  async obterNovoAccessToken(): Promise<void> {
    const bory = `grant_type=refresh_token`;

    return this.http.post(this.oauthTokenUrl, bory, { withCredentials: true })
      .toPromise()
      .then(response => {

        const responseJson = JSON.stringify(response);
        this.decodificaEArmazenarToken(responseJson);
        console.log('Novo accessToken criado!');

        return Promise.resolve(null);
      })
      .catch(response => {

        console.log('erro ao criar token', response);
        this.erroHandlerService.handler(response);

        return Promise.resolve(null);

      });
  }

  obterNovoAccessToken2(): Observable<any> {
    const bory = `grant_type=refresh_token`;

    return this.http.post(this.oauthTokenUrl, bory, { withCredentials: true })
      .pipe(map(response => {
        const responseJson = JSON.stringify(response);
        this.decodificaEArmazenarToken(responseJson);
        console.log('Novo accessToken criado!');
      },
       (error: any) => {
        console.log('erro ao criar token', error);
       }));

  }

  isAccessTokenInvalido() {
    const currentTime = new Date().getTime() / 1000;
    const token = localStorage.getItem('token');

    return !token || currentTime > this.jwtPayload.exp;
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temAlgumaPermissao(roles: []) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
  }

  private decodificaEArmazenarToken(token: string) {
    this.jwtPayload = jwt_decode(token);
    localStorage.setItem('token', token);
  }

  private carregaToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.decodificaEArmazenarToken(token);
    }
  }

  public getToken(): string {
    const token = localStorage.getItem('token');

    if (token) {
      const accessToken = JSON.parse(token);
      return `${accessToken.access_token}`;
    }
  }

  public coletaRequisicaoFalha(request: any): void {
    this.cacheRequest.push(request);
    console.log('request falha: ');
    console.log(request);


  }

  public refazerRequestFalha(): void {

  }
}
