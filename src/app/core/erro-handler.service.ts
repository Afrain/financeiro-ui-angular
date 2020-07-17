import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErroHandlerService {

  constructor(private messageService: MessageService,
              private router: Router) { }

  handler(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {

      msg = errorResponse;

    } else if (errorResponse.error.error === 'invalid_token') {

      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if (errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;

      msg = 'Ocorreu um erro ao processar sua solitação';

      if (errorResponse.status === 400) {
        msg = errorResponse.error[0].messagemUsuario;
      }

      if (errorResponse.status === 403) {
        msg = 'Não tem permissão para executar está ação!';
      }

      try {
        errors = errorResponse.json();

        msg = errors[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else {

      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro: ', errorResponse);

    }
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: `${msg}`});
  }

}
