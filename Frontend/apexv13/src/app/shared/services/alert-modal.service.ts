import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { AddOrdemServicoModalComponent } from '../add-ordem-servico-modal/add-ordem-servico-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  constructor(private modalService: BsModalService) {}

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }
  showAlertOptions(message: string){

  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string, colorButtonOk?: string, hasCpfInput? :boolean) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }
    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }

    if (colorButtonOk) {
      bsModalRef.content.colorButtonOk = colorButtonOk;
    }

    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    if (hasCpfInput) {
      bsModalRef.content.hasCpfInput = hasCpfInput;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }

  addOSModal(oficina: any){
    const initialState = {
      oficina: oficina
    };

    // Use a classe "modal-xl" para aumentar o tamanho do modal
    const modalOptions: ModalOptions = {
      initialState,
      class: 'modal-xl'
    };

    const bsModalRef: BsModalRef = this.modalService.show(AddOrdemServicoModalComponent, modalOptions);

    return (<AddOrdemServicoModalComponent>bsModalRef.content).confirmResult;
  }

}
