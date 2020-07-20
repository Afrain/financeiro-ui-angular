import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/models';
import { ErroHandlerService } from './../../core/erro-handler.service';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})

export class PessoaCadastroComponent implements OnInit {

  cidades = [];
  estados = [];

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
              private messageService: MessageService,
              private erroHandlerService: ErroHandlerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private title: Title) { }

  ngOnInit() {
     const codigoPessoa = this.activatedRoute.snapshot.params.codigo;
     if (codigoPessoa) {
       this.carregarPessoa(codigoPessoa);
     }

     this.title.setTitle('Cadastro Pessoa');
  }

  get editando() {
    return Boolean (this.pessoa.codigo);
  }

  salvarPessoa(form: FormControl) {
    if (this.editando) {
      this.editarPessoa(form);
    } else {
      this.confirmarPessoa(form);
    }
  }

  confirmarPessoa(form: any) {
    this.pessoaService.salvarPessoa(this.pessoa)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success', summary: 'SALVO!', detail: 'Pessoa salva com sucesso!'
        });
        this.novo(form);
      },
      (error: any) => {
        this.erroHandlerService.handler(error);
      });
  }

  editarPessoa(form: any) {
    this.pessoaService.editarPessoa(this.pessoa)
      .subscribe(response => {
        this.messageService.add({
          severity: 'success', summary: 'Editado!', detail: 'Pessoa editada com sucesso!'
        });
        this.pessoa = response as Pessoa;
        this.atualizaTitle();
      },
      (error: any) => {
        this.erroHandlerService.handler(error);
      });
  }

  carregarPessoa(codigoPessoa: number) {
    this.pessoaService.buscarPessoaPorCodigo(codigoPessoa)
      .subscribe(response => {
        this.pessoa = response as Pessoa;
        this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`);
      },
      (error: any) => {
        this.erroHandlerService.handler(error);
      });
  }

  novo(form: any) {
    form.reset();
    this.pessoa = new Pessoa();
    this.router.navigate(['pessoas/novo']);
  }

  atualizaTitle() {
    this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`);
  }

}
