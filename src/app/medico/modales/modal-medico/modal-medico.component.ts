import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Medico } from '../../interfaces/medico';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicoService } from '../../services/medico.service';
import { SharedService } from '../../../shared/shared.service';
import { SpecialityService } from '../../../speciality/services/speciality.service';
import { Speciality } from '../../../speciality/interfaces/speciality';

@Component({
  selector: 'app-modal-medico',
  templateUrl: './modal-medico.component.html',
  styleUrl: './modal-medico.component.css'
})
export class ModalMedicoComponent implements OnInit {

  formMedico: FormGroup;
  title: string = 'Agregar';
  nameButton: string = 'Guardar';
  listSpecialities: Speciality[] = [];

  constructor(private  modal: MatDialogRef<ModalMedicoComponent>,
              @Inject(MAT_DIALOG_DATA) public datosMedico: Medico,
              private fb: FormBuilder,
              private _specialityService: SpecialityService,
              private _medicoService: MedicoService,
              private _sharedservice: SharedService){
    this.formMedico = this.fb.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: [''],
      genero: ['F', Validators.required],
      especialidadId: ['', Validators.required],
      estado: ['1', Validators.required],
    }); 
    if(datosMedico != null){
      this.title = 'Editar';
      this.nameButton = 'Actualizar';
    }  
    this._specialityService.listActivos().subscribe({
      next: (data) =>{
        if(data.isSuccess) this.listSpecialities = data.result;
      },
      error: (e) => {}
    })         
  }

  ngOnInit(): void {
    if(this.datosMedico != null)
    {
      this.formMedico.patchValue({
        apellido: this.datosMedico.apellido,
        nombre: this.datosMedico.nombre,
        direccion : this.datosMedico.direccion,
        telefono : this.datosMedico.telefono,
        genero : this.datosMedico.genero,
        especialidadId : this.datosMedico.especialidadId,
        estado: this.datosMedico.estado.toString() 
      })
    }
  }

  crearModificarMedico(){
    const medico: Medico = {
      id: this.datosMedico == null ? 0 : this.datosMedico.id,
      apellido: this.formMedico.value.apellido,
      nombre: this.formMedico.value.nombre,
      direccion: this.formMedico.value.direccion,
      telefono: this.formMedico.value.telefono,
      genero: this.formMedico.value.genero,
      especialidadId: this.formMedico.value.especialidadId,
      estado: parseInt(this.formMedico.value.estado),
      nameSpeciality: '' 
    }
    if(this.datosMedico == null)  // crear nuevo medico
    {
        this._medicoService.create(medico).subscribe({   
          next: (data) => {
            if(data.isSuccess)
            {
               this._sharedservice.showAlert('Medico ha sido grabado con Exito!', 
                                             'Completo');
               this.modal.close("true");                              
            }
            else
              this._sharedservice.showAlert('No se pudo crear el Medico', 
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
      this._medicoService.update(medico).subscribe({
        next: (data) => {
          if(data.isSuccess)
          {
             this._sharedservice.showAlert('Medico ha sido actualizado con Exito!', 
                                           'Completo');
             this.modal.close("true");                              
          }
          else
            this._sharedservice.showAlert('No se pudo actualizar el Medico', 
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
