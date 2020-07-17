import { Pessoa } from './../core/models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

export class PessoaFiltro {
  nome: string;
  itensPorPagina = 20;
  pagina = 0;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  pesquisarPessoas(filtro: any): Observable<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoaUrl}`, { params });
  }

  salvarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.post(`${this.pessoaUrl}`, JSON.stringify(pessoa));
  }

  mudarStatusPessoa(codigo: number, novoStatus: any): Observable<any> {
    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, novoStatus);
  }

  excluirPessoa(codigo: any) {
    return this.http.delete(`${this.pessoaUrl}/${codigo}`);
  }

  listarTodasPessoas(): Observable<any> {
    return this.http.get(`${this.pessoaUrl}`);
  }

  editarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.put(`${this.pessoaUrl}/${pessoa.codigo}`, JSON.stringify(pessoa));
  }

  buscarPessoaPorCodigo(codigo: number): Observable<any> {
    return this.http.get(`${this.pessoaUrl}/${codigo}`);
  }

}
