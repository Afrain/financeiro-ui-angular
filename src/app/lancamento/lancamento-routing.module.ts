import { AuthGuard } from './../seguranca/auth.guard';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
 {
   path: 'lancamentos',
   component: LancamentoPesquisaComponent,
   canActivate: [AuthGuard],
   data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  },
  {
    path: 'lancamentos/novo',
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  },
  {
    path: 'lancamentos/:codigo',
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LancamentoRoutingModule { }
