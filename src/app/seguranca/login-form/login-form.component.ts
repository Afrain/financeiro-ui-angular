import { LogoutService } from './../logout.service';
import { Router } from '@angular/router';
import { ErroHandlerService } from './../../core/erro-handler.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private auth: AuthService,
              private logoutService: LogoutService,
              private router: Router,
              private erroHandle: ErroHandlerService) { }

  ngOnInit() { }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .then(() => {
        this.router.navigate(['lancamentos']);
      })
      .catch(error => {
        this.erroHandle.handler(error);
      });
  }

}
