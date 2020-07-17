import { AuthService } from './../seguranca/auth.service';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request = null;
    const accessToken = this.auth.getToken();

    if (accessToken && !this.auth.isAccessTokenInvalido()) {
      request = req.clone({
        headers: req.headers.set('Authorization', `bearer ${accessToken}`)
          .set('Content-Type', 'application/json'),

      });
    } else {

      request = req.clone({
        headers: req.headers.set('Authorization', 'Basic YW5ndWxhcjoxMjM=')
          .set('Content-Type', 'application/x-www-form-urlencoded'),

      });
    }

    return next.handle(request)// .pipe(tap((event: HttpEvent<any>) => {
      // FAÇA ALGO AQUI
      // },
      // (error: any) => {

      // if (error instanceof HttpErrorResponse) {

      // if (error.status === 401) {

      // this.isRefreshToken = true;

      // Reiniciando o valor do token aqui para que os proximos pedidos
      // aguardem até que o token volte da chamada de atualização do token.
      // this.tokenSubject.next(null);

      //  return this.auth.obterNovoAccessToken2()
      // .pipe()
      // .subscribe(response => {
      // console.log('renovou token');

      //  }
      // );

      // }

      // }
      // }))
      ;

  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})


export class Interceptor { }
