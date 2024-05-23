import { Injectable } from '@angular/core';
import { Task } from './taskboard.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable()
export class TaskBoardService {

  constructor() { }

  public tasks: Task[] = [
    new Task(
      1,
      'Troca de Óleo', // servico
      'primary', 
      'Trocar o óleo do motor e verificar o filtro.', // descricao servico 
      'text',
      'Paula Sampaio', // nome cliente
      'Renault Logan', // Carro
      '10, Maio', // Data 
      'Paula Sampaio', // nome cliente
      ['assets/img/portrait/small/avatar-s-2.png'],
      true,
      'Aguardando'
    ),
    new Task(
      2,
      'Alinhamento', // servico
      'primary',
      'Realizar alinhamento e balanceamento das rodas.', // descricao servico
      'text',
      'Maria Silva', // nome cliente
      'Toyota Corolla', // Carro
      '12, Maio', // Data
      'Maria Silva', // nome cliente
      ['assets/img/portrait/small/avatar-s-17.png'], // Adicionei uma imagem fictícia para consistência
      false,
      'Aguardando'
    ),
    new Task(
      3,
      'Troca de Pneus', // servico
      'primary',
      'assets/img/banner/banner-41.jpg', // descricao servico
      'image',
      'João Souza', // nome cliente
      'Honda Civic', // Carro
      '15, Maio', // Data (adicionada para consistência)
      'João Souza', // nome cliente
      ['assets/img/portrait/small/avatar-s-6.png'],
      true,
      'Aguardando'
    ),
    new Task(
      4,
      'Inspeção de Freios', // servico
      'warning',
      'Verificar o estado dos freios e fazer a troca se necessário.', // descricao servico
      'text', // Corrigido para 'text'
      'Pedro Santos', // nome cliente
      'Ford Fiesta', // Carro
      '20, Maio', // Data (adicionada para consistência)
      'Pedro Santos', // nome cliente
      ['assets/img/portrait/small/avatar-s-4.png'], // Adicionei uma imagem fictícia para consistência
      true,
      'emAtendimento'
    ),
    new Task(
      5,
      'Substituição de Bateria', // servico
      'warning',
      'assets/img/banner/banner-42.jpg', // descricao servico
      'image',
      'Ana Costa', // nome cliente
      'Chevrolet Cruze', // Carro
      '22, Maio', // Data (adicionada para consistência)
      'Ana Costa', // nome cliente
      ['assets/img/portrait/small/avatar-s-7.png'],
      true,
      'emAtendimento'
    ),
    new Task(
      6,
      'Revisão Completa', // servico
      'warning',
      'Revisão dos 50.000 km.', // descricao servico
      'text',
      'Lucas Ferreira', // nome cliente
      'Volkswagen Golf', // Carro
      '18, Maio', // Data
      'Lucas Ferreira', // nome cliente
      ['assets/img/portrait/small/avatar-s-11.png'],
      true,
      'emAtendimento'
    ),
    new Task(
      7,
      'Troca de Correia Dentada', // servico
      'success',
      'Substituir a correia dentada e verificar tensores.', // descricao servico
      'text',
      'Carlos Oliveira', // nome cliente
      'Hyundai HB20', // Carro
      '25, Maio', // Data (adicionada para consistência)
      'Carlos Oliveira', // nome cliente
      ['assets/img/portrait/small/avatar-s-13.png'],
      true,
      'Pronto'
    ),
    new Task(
      8,
      'Troca de Velas', // servico
      'success',
      'Trocar as velas de ignição.', // descricao servico
      'text',
      'Maria Silva', // nome cliente
      'Nissan Sentra', // Carro
      '16, Maio', // Data
      'Maria Silva', // nome cliente
      ['assets/img/portrait/small/avatar-s-16.png'],
      true,
      'Pronto'
    ),
    new Task(
      9,
      'Diagnóstico de Motor', // servico
      'success',
      'Realizar diagnóstico completo do motor.', // descricao servico
      'text',
      'João Souza', // nome cliente
      'Fiat Uno', // Carro
      '30, Abril', // Data (adicionada para consistência)
      'João Souza', // nome cliente
      ['assets/img/portrait/small/avatar-s-18.png'], // Adicionei imagens fictícias para consistência
      false,
      'Pronto'
    ),
    new Task(
      10,
      'Lavagem Completa', // servico
      'info',
      'Lavagem completa e polimento.', // descricao servico
      'text',
      'Ana Costa', // nome cliente
      'Renault Sandero', // Carro
      '20, Maio', // Data
      'Ana Costa', // nome cliente
      ['assets/img/portrait/small/avatar-s-26.png'],
      true,
      'Concluido'
    ),
    new Task(
      11,
      'Pintura de Para-choque', // servico
      'info',
      'Pintura do para-choque dianteiro.', // descricao servico (adicionada descrição consistente)
      'text', // Corrigido para 'text'
      'Lucas Ferreira', // nome cliente
      'Peugeot 208', // Carro
      '28, Abril', // Data (adicionada para consistência)
      'Lucas Ferreira', // nome cliente
      ['assets/img/portrait/small/avatar-s-22.png'], // Adicionei uma imagem fictícia para consistência
      false,
      'Concluido'
    ),
    new Task(
      12,
      'Reparação de Amortecedores', // servico
      'info',
      'Verificar e reparar os amortecedores dianteiros.', // descricao servico
      'text',
      'Pedro Santos', // nome cliente
      'Kia Sportage', // Carro
      '22, Maio', // Data
      'Pedro Santos', // nome cliente
      ['assets/img/portrait/small/avatar-s-24.png'],
      true,
      'Concluido'
    )
  ];
  

  addNewTask(title: string, message: string, type: string) {

    let badgeClass = 'primary';

    if(type === 'Aguardando') {
      badgeClass = 'primary'
    }
    else if(type === 'emAtendimento') {
      badgeClass = 'warning'
    }
    else if(type === 'Pronto') {
      badgeClass = 'success'
    }
    else if(type === 'Concluido') {
      badgeClass = 'info'
    }


    let task: Task = {
      taskId: Math.round(Math.random() * 10000000000),
      taskTitle: title,
      taskMessage: message,
      createdOn: 'Nov 12',
      createdBy: 'Elizabeth Elliott',
      assignedTo: ['assets/img/portrait/small/avatar-s-4.png'],
      status: type,
      badgeClass: badgeClass,
      messageType: 'text',
      messageCount: '',
      linkCount: '',
      isUserImg: true,
    }
    this.tasks.unshift(task);
    return of(this.tasks.slice()).pipe(delay(100));

  }

}
