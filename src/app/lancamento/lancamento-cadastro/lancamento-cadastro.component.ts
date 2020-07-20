import { MessageService } from 'primeng/api';
import { LancamentoService } from '../lancamento.service';
import { PessoaService } from './../../pessoa/pessoa.service';
import { CategoriaService } from './../../categoria/categoria.service';

import { Lancamento } from './../../core/models';
import { ErroHandlerService } from './../../core/erro-handler.service';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private messageService: MessageService,
              private erroHandlerService: ErroHandlerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private title: Title) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
    this.title.setTitle('Cadastro Lançamento');

    const codigoLancamento = this.activatedRoute.snapshot.params.codigo;
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  novo(form: any) {
    form.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['lancamentos/novo']);
  }

  salvarLancamento(form: any) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adcionarLancamento(form);
    }
  }

  adcionarLancamento(form: any) {
    this.lancamentoService.salvarLancamento(this.lancamento)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success', summary: 'Salvo!', detail: 'Lancamento salvo com sucesso!'
        });
        this.novo(form);
      },
      (error: any) => {
        this.erroHandlerService.handler(error);
      });
  }

  atualizarLancamento(form: any) {
    this.lancamentoService.editarLancamento(this.lancamento)
      .subscribe(response => {
       // this.lancamento = response;
        this.messageService.add({
          severity: 'success', summary: 'Editado!', detail: 'Lancamento editado com sucesso!'
        });
      },
      (error: any) => {
        this.erroHandlerService.handler(error);
      });
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarLancamentoPorCodigo(codigo)
      .subscribe((response: Lancamento) => {
        this.lancamento = response;
        this.atualizaTitle();
      },
      (error: any) => {
        this.erroHandlerService.handler(error);
      });
  }

  carregarCategorias() {
    this.categoriaService.listarTodasCategorias()
      .subscribe((response: any) => {
        this.categorias = response.map(c => ({label: c.nome, value: c.codigo}));
      },
      (error: any) => {
        this.erroHandlerService.handler(error);
      });
  }

  carregarPessoas() {
    this.pessoaService.listarTodasPessoas()
      .subscribe(response => {
        this.pessoas = response.content.map(p => ({label: p.nome, value: p.codigo}));
      },
      (error: any) => {
        this.erroHandlerService.handler(error);
      });
  }

  atualizaTitle() {
    this.title.setTitle(`Editar Lançamento: ${this.lancamento.descricao}`);
  }

}
