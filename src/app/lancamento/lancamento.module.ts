import { RouterModule } from '@angular/router';
import { LancamentoRoutingModule } from './lancamento-routing.module';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { MessageModule } from 'primeng/components/message/message';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';

import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// tslint:disable-next-line: quotemark
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextareaModule,
    SelectButtonModule,
    CalendarModule,
    CurrencyMaskModule,
    MessageModule,
    TooltipModule,

    LancamentoRoutingModule
  ]
})
export class LancamentoModule { }
