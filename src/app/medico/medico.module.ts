import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ListadoMedicoComponent } from './pages/listado-medico/listado-medico.component';
import { MedicoService } from './services/medico.service';
import { ModalMedicoComponent } from './modales/modal-medico/modal-medico.component';



@NgModule({
  declarations: [
    ListadoMedicoComponent,
    ModalMedicoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  providers:[
    MedicoService
  ]
})
export class MedicoModule { }
