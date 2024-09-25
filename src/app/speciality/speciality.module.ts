import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { SpecialityService } from './services/speciality.service';
import { ListSpecialityComponent } from './pages/list-speciality/list-speciality.component';
import { ModalSpecialityComponent } from './modales/modal-speciality/modal-speciality.component';



@NgModule({
  declarations: [
    ListSpecialityComponent,
    ModalSpecialityComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    SpecialityService
  ]
})
export class SpecialityModule { }
