import { AuthService } from './../../seguranca/auth.service';
import { Lancamento } from './../../core/models';
import { ErroHandlerService } from './../../core/erro-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

import { LazyLoadEvent } from 'primeng/components/common/api';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/components/table/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos: Lancamento;
  erro: any;
  @ViewChild(Table, {static: false}) tableComponent: Table;

  constructor(
    private lancamentoService: LancamentoService,
    private auth: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private erroHandleService: ErroHandlerService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa Lançamento');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisarLancamentos(this.filtro).subscribe(
      (data: any) => {
        if (pagina === 0) {
          this.tableComponent.first = 0;
        }
        this.totalRegistros = data.total;
        this.lancamentos = data.lancamentos.content;
      }, (error: any) => {
        this.erroHandleService.handler(error);
      });
  }

  confirmaExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluirLancamento(lancamento.codigo)
      .subscribe((data: any) => {
        this.tableComponent.reset();
        this.messageService.add({
          severity: 'success', summary: 'EXCLUIDO!', detail: 'Lancamento excluido com sucesso!'
        });
      },
      (error: any) => {
        this.erroHandleService.handler(error);
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
