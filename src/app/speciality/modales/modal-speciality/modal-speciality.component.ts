import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Speciality } from '../../interfaces/speciality';
import { SpecialityService } from '../../services/speciality.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-modal-speciality',
  templateUrl: './modal-speciality.component.html',
  styleUrl: './modal-speciality.component.css'
})
export class ModalSpecialityComponent implements OnInit{

  formSpeciality: FormGroup;
  title: string = 'Agregar';
  nameButton: string = 'Guardar';

  constructor(private  modal: MatDialogRef<ModalSpecialityComponent>,
              @Inject(MAT_DIALOG_DATA) public datosSpeciality: Speciality,
              private fb: FormBuilder,
              private _specialityService: SpecialityService,
              private _sharedservice: SharedService){
    this.formSpeciality = this.fb.group({
      namespeciality: ['', Validators.required],
      description: ['', Validators.required],
        state: ['1', Validators.required],
    }); 
    if(datosSpeciality != null){
      this.title = 'Editar';
      this.nameButton = 'Actualizar';
    }           
  }

  ngOnInit(): void {
    if(this.datosSpeciality != null)
    {
      this.formSpeciality.patchValue({
        namespeciality: this.datosSpeciality.namespeciality,
        description: this.datosSpeciality.description,
        state: this.datosSpeciality.state.toString() 
      })
    }
  }

  crearModificarEspecialidad(){
    const especialidad: Speciality = {
      id: this.datosSpeciality == null ? 0 : this.datosSpeciality.id,
      namespeciality: this.formSpeciality.value.namespeciality,
      description: this.formSpeciality.value.description,
      state: parseInt(this.formSpeciality.value.state) 
    }
    if(this.datosSpeciality == null)
    {
        // crear nueva especilidad
        this._specialityService.create(especialidad).subscribe({
          next: (data) => {
            if(data.isSuccess)
            {
               this._sharedservice.showAlert('La especialidad ha sido grabada con Exito!', 
                                             'Completo');
               this.modal.close("true");                              
            }
            else
              this._sharedservice.showAlert('No se pudo crear la especialidad', 
                                           'Error!');   
          },
            error: (e) => {
              this._sharedservice.showAlert(e.error.message, 
                'Error!');   
            }
        })
    }
    else
    {
      
      // editar/ actualizar especialidad
      this._specialityService.update(especialidad).subscribe({
        next: (data) => {
          if(data.isSuccess)
          {
             this._sharedservice.showAlert('La especialidad ha sido actualizada con Exito!', 
                                           'Completo');
             this.modal.close("true");                              
          }
          else
            this._sharedservice.showAlert('No se pudo actualizar la especialidad', 
                                         'Error!');   
        },
          error: (e) => {
            this._sharedservice.showAlert(e.error.message, 
              'Error!'); 
          }
      })
    }
  }

}
