import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-fotos-veiculo-modal',
  templateUrl: './fotos-veiculo-modal.component.html',
  styleUrls: ['./fotos-veiculo-modal.component.scss']
})
export class FotosVeiculoModalComponent implements OnInit {
  fotos: any[] = [];
  loading: boolean = false;
  fotoAmpliadaIndex: number = 0;
  mostrarFotoAmpliada: boolean = false;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  ampliarFoto(index: number) {
    this.fotoAmpliadaIndex = index;
    this.mostrarFotoAmpliada = true;
  }

  fecharFotoAmpliada() {
    this.mostrarFotoAmpliada = false;
  }

  navegarFoto(direcao: number) {
    this.fotoAmpliadaIndex += direcao;
    if (this.fotoAmpliadaIndex < 0) {
      this.fotoAmpliadaIndex = 0;
    }
    if (this.fotoAmpliadaIndex >= this.fotos.length) {
      this.fotoAmpliadaIndex = this.fotos.length - 1;
    }
  }

  fechar() {
    this.bsModalRef.hide();
  }
}
