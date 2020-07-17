import { AuthService } from './../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { ErroHandlerService } from './../../core/erro-handler.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { Pessoa } from './../pessoa.models';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/components/table/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas: Pessoa;
  erro: any;
  acao: any;
  @ViewChild(Table, { static: false }) tableComponent: Table;

  constructor(private pessoaService: PessoaService,
              private messageService: MessageService,
              private auth: AuthService,
              private erroHandlerService: ErroHandlerService,
              private confirmationService: ConfirmationService,
              private router: Router,
              private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa Pessoa');
  }

  pesquisarPessoas(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisarPessoas(this.filtro)
      .subscribe((response: any) => {
        if (pagina === 0) {
          this.tableComponent.first = 0;
        }
        this.totalRegistros = response.totalElements;
        this.pessoas = response.content;

      },
      (error: any) => {
        this.erro = error;
      });

  }

  mudarStatusPessoa(pessoa: any) {
    const novoStatus = !pessoa.ativo;
    const acao = novoStatus ? 'ativada' : 'desativada';
    this.pessoaService.mudarStatusPessoa(pessoa.codigo, novoStatus)
    .subscribe(() => {
      this.pesquisarPessoas();
      this.router.navigate(['pessoas']);
      this.messageService.add({
        severity: 'success', summary: 'Status Cliente', detail: `Pessoa ${acao} com sucesso!`
      });
    },
    (error: any) => {
      this.erroHandlerService.handler(error);
    });

  }

  confirmaExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir?',
      accept: () => {
        this.excluirPessoa(pessoa);
      }
    });
  }

  excluirPessoa(pessoa: any) {
    this.pessoaService.excluirPessoa(pessoa.codigo)
      .subscribe(response => {
        this.tableComponent.reset();
        this.messageService.add({
          severity: 'success', summary: 'EXCLUIDO!', detail: `${pessoa.nome} foi excluido(a) com sucesso!`
        });
      },
      (error: any) => {
        this.erroHandlerService.handler(error);
      });

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisarPessoas(pagina);
  }

}
