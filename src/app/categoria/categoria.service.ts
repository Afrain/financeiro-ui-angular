import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl: string;

  constructor(private http: HttpClient) {
    this.categoriaUrl = `${environment.apiUrl}/categorias`;
   }


  listarTodasCategorias(): Observable<any> {
    return this.http.get(`${this.categoriaUrl}`);
  }
}
