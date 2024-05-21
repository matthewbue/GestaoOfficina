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
      'Troca de Óleo',
      'primary',
      'Trocar o óleo do motor e verificar o filtro.',
      'text',
      "1",
      "3",
      'May 10',
      'Carlos Oliveira',
      ['assets/img/portrait/small/avatar-s-2.png', 'assets/img/portrait/small/avatar-s-3.png'],
      true,
      'Aguardando'
    ),
    new Task(
      2,
      'Alinhamento',
      'primary',
      'Realizar alinhamento e balanceamento das rodas.',
      'text',
      "",
      "",
      'May 12',
      'Maria Silva',
      [{name: 'A', class: 'warning'}],
      false,
      'Aguardando'
    ),
    new Task(
      3,
      'Troca de Pneus',
      'primary',
      'Substituir os pneus dianteiros.',
      'text',
      "2",
      "1",
      '',
      'João Souza',
      ['assets/img/portrait/small/avatar-s-6.png'],
      true,
      'Aguardando'
    ),
    new Task(
      4,
      'Inspeção de Freios',
      'warning',
      'assets/img/banner/banner-10.jpg',
      'image',
      "",
      "",
      '',
      'Pedro Santos',
      [],
      true,
      'emAtendimento'
    ),
    new Task(
      5,
      'Substituição de Bateria',
      'warning',
      'Trocar a bateria e verificar o alternador.',
      'text',
      "",
      "6",
      '',
      'Ana Costa',
      ['assets/img/portrait/small/avatar-s-7.png', 'assets/img/portrait/small/avatar-s-8.png', 'assets/img/portrait/small/avatar-s-9.png', 'assets/img/portrait/small/avatar-s-10.png'],
      true,
      'emAtendimento'
    ),
    new Task(
      6,
      'Revisão Completa',
      'warning',
      'Revisão dos 50.000 km.',
      'text',
      "4",
      "",
      'May 18',
      'Lucas Ferreira',
      ['assets/img/portrait/small/avatar-s-11.png', 'assets/img/portrait/small/avatar-s-12.png'],
      true,
      'emAtendimento'
    ),
    new Task(
      7,
      'Troca de Correia Dentada',
      'success',
      'Substituir a correia dentada e verificar tensores.',
      'text',
      "3",
      "2",
      '',
      'Carlos Oliveira',
      ['assets/img/portrait/small/avatar-s-13.png', 'assets/img/portrait/small/avatar-s-14.png', 'assets/img/portrait/small/avatar-s-15.png'],
      true,
      'Pronto'
    ),
    new Task(
      8,
      'Troca de Velas',
      'success',
      'Trocar as velas de ignição.',
      'text',
      "",
      "",
      'May 16',
      'Maria Silva',
      ['assets/img/portrait/small/avatar-s-16.png', 'assets/img/portrait/small/avatar-s-17.png'],
      true,
      'Pronto'
    ),
    new Task(
      9,
      'Diagnóstico de Motor',
      'success',
      'Realizar diagnóstico completo do motor.',
      'text',
      "8",
      "",
      '',
      'João Souza',
      [{name: 'M', class: 'primary'}, {name: 'J', class: 'success'}],
      false,
      'Pronto'
    ),
    new Task(
      10,
      'Lavagem Completa',
      'info',
      'Lavagem completa e polimento.',
      'text',
      "",
      "",
      'May 20',
      'Ana Costa',
      ['assets/img/portrait/small/avatar-s-26.png'],
      true,
      'Concluido'
    ),
    new Task(
      11,
      'Pintura de Para-choque',
      'info',
      'assets/img/banner/banner-22.jpg',
      'image',
      "2",
      "5",
      '',
      'Lucas Ferreira',
      [{name: 'P', class: 'secondary'}, {name: 'F', class: 'danger'}, {name: 'T', class: 'info'}],
      false,
      'Concluido'
    ),
    new Task(
      12,
      'Reparação de Amortecedores',
      'info',
      'Verificar e reparar os amortecedores dianteiros.',
      'text',
      "5",
      "4",
      'May 22',
      'Pedro Santos',
      ['assets/img/portrait/small/avatar-s-24.png', 'assets/img/portrait/small/avatar-s-20.png'],
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
