import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import Frase from '../shared/frase.model';
import { FRASES } from './frase-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES;
  public instrucao: string = 'Traduza esta frase:';
  public recebeTexto: string = '';
  public rodada: number = 0;
  public rodadaFrase: Frase;
  public progresso: number = 0;
  public tentativas: number = 3;
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit() {
  }

  public atualizaResposta(texto: Event): void {
    this.recebeTexto = (<HTMLInputElement>texto.target).value;
  }

  public verificarResposta(): void {

    if(this.rodadaFrase.frasePtBr == this.recebeTexto) {

      this.rodada++;

      this.progresso = this.progresso + 25;

      if (this.rodada === 5) {
        this.encerrarJogo.emit('vitoria');
      }

      this.atualizaRodada();

    } else {

      this.tentativas--;

      if (this.tentativas === 0){
      } else if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota');
      }

    }
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.recebeTexto = '';
  }

  ngOnDestroy() {}
}
