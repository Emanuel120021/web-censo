import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  requestCount = 0;
  mensagens = [
    'Respira fundo, tudo que é bom leva tempo!',
    'Enquanto isso, que tal pensar no que vai jantar hoje?',
    'Já bebeu água hoje? Aproveita enquanto espera!',
    'Isso está demorando mais que bolo no forno...',
    'Aposto que você está mexendo no celular enquanto espera.',
    'Tá mais lento que fila de banco, mas vai chegar!',
    'Já deu tempo de pensar em comprar uma plantinha, hein?',
    'Aguarde... mas sem perder a paciência, por favor!',
    'Talvez você devesse checar as notificações enquanto espera.',
    'Isso está quase tão demorado quanto encontrar a tampa do Tupperware certo.',
    'Já tentou imitar o barulho de uma galinha? Vai te distrair.',
    'Aguarde um instante... ou dois... ou três.',
    'Por que será que o tempo passa mais devagar quando estamos esperando?',
    'Tempo é relativo, já dizia Einstein. Então relaxa.',
    'Isso vai terminar antes de você decidir o que assistir no streaming.',
    'Aproveita para rolar o feed das redes sociais. Ou não.',
    'Prometemos que está quase tão rápido quanto um dia preguiçoso.',
    'Enquanto isso, um café caía bem, não acha?',
    'Olha só, já deu tempo de fazer uma pausa para respirar fundo.',
    'Se fosse um táxi, ele estaria parado no sinal vermelho.',
    'Não está tão rápido quanto um carro de Fórmula 1, mas tá indo.',
    'Dá tempo de fazer um alongamento aí na cadeira.',
    'Talvez você devesse considerar cortar o cabelo enquanto espera.',
    'Enquanto isso, o que acha de contar quantos dedos tem na mão?',
    'Carregando... já viu a previsão do tempo hoje?',
    'Isso está demorando quase tanto quanto esperar o ônibus no ponto.',
    'Se tivesse música, você já estaria dançando!',
    'É a vida... às vezes, ela é rápida, às vezes, é assim.',
    'Relaxa, o importante é que estamos a caminho!',
    'Talvez agora seja um bom momento para cantar no chuveiro... mentalmente.',
    'Isso vai acabar antes de você organizar sua gaveta de meias.',
    'Que tal um cochilo rápido enquanto espera?',
    'Enquanto isso, veja se consegue tocar o nariz com a língua.',
    'Já deu tempo de lembrar daquela vergonha de 2008, né?',
    'Isso está mais demorado que aprender a andar de bicicleta.',
    'Aguarde... ou pegue uma bolacha para passar o tempo.',
    'Tá mais lento que tartaruga em dia de chuva, mas vai!',
    'Que tal contar quantas vezes você pisca por minuto?',
    'Se você está impaciente, tenta respirar fundo. De novo. E de novo.',
    'Está demorando, mas é porque queremos que seja perfeito!',
    'Isso é mais demorado que uma criança aprendendo a amarrar o sapato.',
    'Sabe aquela piada longa que demora para chegar na punchline? Pois é.',
    'Aguarde... mas sem pensar no tempo que está passando!',
    'Isso está indo mais devagar que fila para parque de diversões.',
    'Já pensou que esse tempo de espera é um bom momento para filosofar?',
    'Aguarde... mas tente não ficar olhando fixamente para a tela!',
    'Que tal fazer um origami invisível enquanto espera?',
    'Dizem que paciência é uma virtude. Você já tem bastante, hein?',
    'Tá quase! Tipo aquele último pedacinho do quebra-cabeça.',
    'Aguarde... ou aproveite para olhar o céu. Está bonito hoje?',
  ];

  private mensagemSubject = new BehaviorSubject<string | null>(null); // Inicia com null
  mensagem$ = this.mensagemSubject.asObservable();

  constructor(private spinnerService: NgxSpinnerService) {}

  busy() {
    this.requestCount++;
    this.spinnerService.show();
    // Gera uma mensagem aleatória
    const mensagem =
      this.mensagens[Math.floor(Math.random() * this.mensagens.length)];
    // Emite a mensagem para o componente
    this.mensagemSubject.next(mensagem);
  }

  idle() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.spinnerService.hide();
    }
  }
}
