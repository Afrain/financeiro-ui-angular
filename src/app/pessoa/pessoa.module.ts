import { PessoaRoutingModule } from './pessoa-routing.module';
import { MessageModule } from 'primeng/components/message/message';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { TableModule } from 'primeng/components/table/table';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PessoaPesquisaComponent,
    PessoaCadastroComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule,

    SelectButtonModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    TableModule,
    DropdownModule,
    InputMaskModule,
    MessageModule,
    TooltipModule,

    PessoaRoutingModule

  ]
})
export class PessoaModule { }
