import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.auth.isAccessTokenInvalido()) {

        console.log('Navegação com access token inválido. Obtendo novo access token...');

        return this.auth.obterNovoAccessToken()
          .then(() => {

            if (this.auth.isAccessTokenInvalido) {
              this.router.navigate(['/login']);
              return false;
            }

            return true;
          });

      } else if (next.data.roles && !this.auth.temAlgumaPermissao(next.data.roles)) {
        this.router.navigate(['/acesso-negado']);
        return false;
      }

      return true;
  }

}
