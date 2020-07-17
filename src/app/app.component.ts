import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {

  }

  // RETIRA O NAVBAR DA TELA DE LOGIN
  exibindoNavbar() {
    return this.router.url !== '/login';
  }

}
