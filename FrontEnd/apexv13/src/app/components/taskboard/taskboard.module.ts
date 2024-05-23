import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { StoreModule } from '@ngrx/store';

import { DragulaModule } from 'ng2-dragula';

import { TaskboardComponent } from "./taskboard.component";
import { CrudModalComponent } from './crud-modal/crud-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbModule,
        DragulaModule.forRoot(),
        UiSwitchModule
    ],
    declarations: [
        TaskboardComponent,
        CrudModalComponent
    ],
    exports: [TaskboardComponent] // Certifique-se de exportar o componente

})
export class TaskboardModule { }
