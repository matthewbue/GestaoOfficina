import { Component, ViewEncapsulation, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskBoardService } from './taskboard.service';
import { CrudModalComponent } from './crud-modal/crud-modal.component';
import { Task } from './taskboard.model';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss'],
  providers: [TaskBoardService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskboardComponent {
  @Output() filterToggle = new EventEmitter<void>();

  @ViewChild('AguardandoTitle') titleInputRef: ElementRef;
  @ViewChild('AguardandoMessage') messageInputRef: ElementRef;

  BAG = "task-group";

  tasks: Task[];
  aguardando: Task[];
  emAtendimento: Task[];
  pronto: Task[];
  concluido: Task[];

  constructor(private dragulaService: DragulaService, private elRef: ElementRef,
     private taskBoardService: TaskBoardService, private modalService: NgbModal,
     private ref: ChangeDetectorRef) {
    this.tasks = this.taskBoardService.tasks;
    this.loadTasks();
    dragulaService.drop(this.BAG)
      .subscribe(({ el, target }) => {
        this.updateTaskStatus(el.getAttribute('task-id'), target.id)
      });
  }

  loadTasks() {
    this.aguardando = this.tasks.filter((task: Task) => task.status === 'Aguardando');
    this.emAtendimento = this.tasks.filter((task: Task) => task.status === 'emAtendimento');
    this.pronto = this.tasks.filter((task: Task) => task.status === 'Pronto');
    this.concluido = this.tasks.filter((task: Task) => task.status === 'Concluido');
    this.ref.markForCheck();
  }

  editTask(task: Task) {
    const modalRef = this.modalService.open(CrudModalComponent);
    modalRef.componentInstance.id = task.taskId; // should be the id
    modalRef.componentInstance.data = { title: task.taskTitle, message: task.taskMessage, type: task.status }; // should be the data

    modalRef.result.then((result) => {

      task.taskTitle = result.title;
      task.taskMessage = result.message;
      task.status = result.type;

      this.updateTaskStatus(task.taskId.toString(), task.status, task);


    }).catch((error) => {
      console.log(error);
    });
  }

  updateTaskStatus(id: string, status: string, task?: Task) {
    let badgeClass = 'primary';

    if (status === 'Aguardando') {
      badgeClass = 'primary'
    }
    else if (status === 'emAtendimento') {
      badgeClass = 'warning'
    }
    else if (status === 'Pronto') {
      badgeClass = 'success'
    }
    else if (status === 'Concluido') {
      badgeClass = 'info'
    }

    let currentTask: Task;

    if (task) {
      currentTask = task;
    }
    else {
      currentTask = this.tasks.find(x => x.taskId === +id);
    }

    let index = this.tasks.indexOf(currentTask);
    currentTask.status = status;
    currentTask.badgeClass = badgeClass;
    this.tasks.splice(index, 1, currentTask);
    this.tasks = [...this.tasks];
    this.loadTasks();
  }

  deleteTask(id: number) {
    let task: Task = this.tasks.find(x => x.taskId === id);
    let index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
    this.tasks = [...this.tasks];
    this.loadTasks();
  }

  addTask() {
    const modalRef = this.modalService.open(CrudModalComponent);
    modalRef.componentInstance.id = 0; // should be the id
    modalRef.componentInstance.data = { title: '', message: '', type: 'Aguardando' }; // should be the data

    modalRef.result.then((result) => {
      this.taskBoardService.addNewTask(result.title, result.message, result.type).subscribe(data => {
        this.tasks = data;
        this.loadTasks();
      });
    }).catch((error) => {
      console.log(error);
    });
  }
  toggleFilter() {
    this.filterToggle.emit();
  }

}
