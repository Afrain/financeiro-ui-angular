import { Lancamento } from './../core/models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 20;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisarLancamentos(filtro: any): Observable<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.lancamentoUrl}?resumo`, { params } )
      .pipe(map(lancamentos => {

        const resultado = {
          lancamentos,
          total: lancamentos.totalElements
        };

        return resultado;
      }));

  }

  salvarLancamento(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.post<any>(`${this.lancamentoUrl}`, JSON.stringify(lancamento));
  }

  excluirLancamento(codigo: number) {
    return this.http.delete(`${this.lancamentoUrl}/${codigo}`);
  }

  editarLancamento(lancamento: Lancamento): Observable<any> {
    return this.http.put(`${this.lancamentoUrl}/${lancamento.codigo}`, JSON.stringify(lancamento));
  }

  buscarLancamentoPorCodigo(codigo: number): Observable<Lancamento> {
    return this.http.get(`${this.lancamentoUrl}/${codigo}`)
      .pipe(map(response => {

        const lancamento = response as Lancamento;

        this.converterStringParaDatas([lancamento]);

        return lancamento;
      }));
  }

  private converterStringParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }

}
