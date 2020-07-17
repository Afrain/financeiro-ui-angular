import { AuthService } from './../seguranca/auth.service';
import { PessoaService } from './../pessoa/pessoa.service';
import { ErroHandlerService } from './erro-handler.service';
import { LancamentoService } from './../lancamento/lancamento.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { MessageService, ConfirmationService } from 'primeng/api';

import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { AcessoNegadoComponent } from './acesso-negado.component';
registerLocaleData(ptBr);

@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, AcessoNegadoComponent],
  exports: [
    NavbarComponent,
    ConfirmDialogModule,
    ToastModule
  ],
  imports: [
    CommonModule,
    RouterModule,

    ConfirmDialogModule,
    ToastModule

  ],
  providers: [
    LancamentoService,
    PessoaService,
    MessageService,
    ErroHandlerService,
    AuthService,

    ConfirmationService,
    Title,

    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
