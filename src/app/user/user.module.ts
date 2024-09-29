import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { ModalUserComponent } from './modales/modal-user/modal-user.component';



@NgModule({
  declarations: [
    LoginComponent,
    ListUserComponent,
    ModalUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
