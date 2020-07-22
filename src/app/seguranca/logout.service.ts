import { environment } from './../../environments/environment.prod';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

tokensRevokeUrl: string;

  constructor(private http: HttpClient,
              private authService: AuthService) {

    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;

  }

  async logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.authService.limparAccessToken();
      });

  }

}
