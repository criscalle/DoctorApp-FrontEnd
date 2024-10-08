import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { User } from '../../interfaces/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { SharedService } from '../../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalUserComponent } from '../../modales/modal-user/modal-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = [
    'username',
    'apellido',
    'nombre',
    'email',
    'rol',
    'acciones'
  ];

  dataInicial : User[] = []
  dataSource = new MatTableDataSource(this.dataInicial);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _userService: UserService,
    private _sharedService: SharedService,
    private dialog: MatDialog
  ) {}

getUser(){
  this._userService.list().subscribe({
    next: (data) => {
      if(data.isSuccess){
        this.dataSource = new MatTableDataSource(data.result)
        this.dataSource.paginator = this.paginator;
      }else{
        this._sharedService.showAlert('No se encontraron datos', 'Advertencia!');
      }
    },
    error: (data) => {}
  })
}

newUser()
{
 this.dialog
 .open(ModalUserComponent, {disableClose: true, width: '600px'})
 .afterClosed()
 .subscribe((result) => {
  if (result === 'true') this.getUser();
 })
}

aplicarFiltroListado(event: Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  if(this.dataSource.paginator){
    this.dataSource.paginator.firstPage();
  }
}

removeUser(user: User)
{Swal.fire({
  title: 'Desea Eliminar el Usuario?',
  text: user.apellido+ ' ' + user.nombre,
  icon: 'warning',
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Sí, eliminar',
  showCancelButton: true,
  cancelButtonColor: '#d33',
  cancelButtonText: 'No',
}).then((result) => {
  if (result.isConfirmed) {
    console.log(user)
    this._userService.delete(user.username).subscribe({
      next: (data) => {
        if (data.isSuccess) {
          this._sharedService.showAlert(
            'Usuario eliminado',
            'Completo'
          );
          this.getUser();
        } else {
          this._sharedService.showAlert(
            'No se pudo eliminar el Usuario',
            'Error!'
          );
        }
      },
      error: (e) => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });
  }
});

}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getUser();
  }
}
