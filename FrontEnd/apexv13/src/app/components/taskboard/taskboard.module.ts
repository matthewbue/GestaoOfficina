import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { StoreModule } from '@ngrx/store';

import { DragulaModule } from 'ng2-dragula';
import { TaskboardRoutingModule } from "./taskboard-routing.module";

import { TaskboardComponent } from "./taskboard.component";
import { CrudModalComponent } from './crud-modal/crud-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        TaskboardRoutingModule,
        ReactiveFormsModule,
        NgbModule,
        DragulaModule.forRoot(),
    ],
    declarations: [
        TaskboardComponent,
        CrudModalComponent
    ],
    exports: [TaskboardComponent] // Certifique-se de exportar o componente

})
export class TaskboardModule { }
