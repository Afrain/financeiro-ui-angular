import { ErroHandlerService } from './../erro-handler.service';
import { Router } from '@angular/router';
import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu: any;

  constructor(public auth: AuthService,
              private logoutService: LogoutService,
              private router: Router,
              private erroHandlerService: ErroHandlerService) { }

  ngOnInit() {
  }

  obterNovoAccesToken() {
    this.auth.obterNovoAccessToken();
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => {
        this.erroHandlerService.handler(erro);
      });
  }

}
