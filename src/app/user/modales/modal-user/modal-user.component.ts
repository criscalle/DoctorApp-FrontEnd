import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from '../../interfaces/rol';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../../../shared/shared.service';
import { UserService } from '../../services/user.service';
import { Registro } from '../../interfaces/registro';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.css'
})
export class ModalUserComponent {
 formUser : FormGroup;
 tittle : string = 'Registrar';
 nameButton : string = 'Guardar';
 listaRoles : Rol[] = [];

 constructor(
  private modal: MatDialogRef<ModalUserComponent>,
  @Inject(MAT_DIALOG_DATA) public datosUsuario: Registro,
  private fb: FormBuilder,
  private _userService: UserService,
  private _sharedService: SharedService
  ){
   this.formUser = this.fb.group({
    userName: ['', Validators.required],
    password: ['',Validators.required],
    apellido: ['', Validators.required],
    nombre: ['', Validators.required],
    email: ['', Validators.required],
    rol: ['', Validators.required]
   });
   this._userService.listRoles().subscribe({
    next: (data) => {
      if (data.isSuccess) this.listaRoles = data.result;
    },
    error: (e) => {}
   });
  }

  registrarUsuario() {
    const user: Registro = {
       userName: this.formUser.value.userName,
       password: this.formUser.value.password,
       apellido: this.formUser.value.apellido,
       nombre: this.formUser.value.nombre,
       email: this.formUser.value.email,
       rol: this.formUser.value.rol
    }
    this._userService.registrar(user).subscribe({
     next: (data) => {
       this._sharedService.showAlert('Usuario ha sido registrado con Exito!','Completo');
       this.modal.close("true");
     },
     error: (e) => {
       this._sharedService.showAlert(e.error.errores, 'Error');
     }
    });
 }

  get email(){
    return this.formUser.get('email');
  }
}