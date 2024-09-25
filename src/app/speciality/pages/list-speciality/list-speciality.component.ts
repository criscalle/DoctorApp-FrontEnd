import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Speciality } from '../../interfaces/speciality';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SpecialityService } from '../../services/speciality.service';
import { SharedService } from '../../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalSpecialityComponent } from '../../modales/modal-speciality/modal-speciality.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-speciality',
  templateUrl: './list-speciality.component.html',
  styleUrl: './list-speciality.component.css'
})
export class ListSpecialityComponent implements OnInit, AfterViewInit {

  displayedColumns : string[] = [
    'namespeciality',
    'description',
    'state',
    'Acciones'
  ];
  datainicial: Speciality[]= [];
  dataSource = new MatTableDataSource(this.datainicial);
  @ViewChild(MatPaginator) paginaciontabla!: MatPaginator;

  constructor(private _specialidadService : SpecialityService,
              private _sharedService : SharedService,
              private dialog: MatDialog){}
              

  newSpeciality(){
  this.dialog
      .open(ModalSpecialityComponent, {disableClose: true, width: '400px'})
      .afterClosed()
      .subscribe((result) => {
        if(result === 'true') this.getSpecialities();
      })
  }
  
  editSpeciality(speciality: Speciality){
    this.dialog
    .open(ModalSpecialityComponent, {disableClose: true, width: '400px', data: speciality})
    .afterClosed()
    .subscribe((result) => {
      if(result === 'true') this.getSpecialities();
    })
  }

  getSpecialities(){
    this._specialidadService.list().subscribe({
      next:(data) => {
        if(data.isSuccess)
          {
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator = this.paginaciontabla;
        }
        else
        {
          this._sharedService.showAlert(
            'No se encontraron datos', 'Advertencia'
          );
        }
      },
      error: (e) => {
        this._sharedService.showAlert(e.error.message, 'Error!');
      }
    });
  }

  removeSpeciality(spec: Speciality) {
    Swal.fire({
      title: 'Desea Eliminar la Especialidad?',
      text: spec.namespeciality,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(spec)
        this._specialidadService.delete(spec.id).subscribe({
          next: (data) => {
            if (data.isSuccess) {
              this._sharedService.showAlert(
                'La especialidad fue eliminada',
                'Completo'
              );
              this.getSpecialities();
            } else {
              this._sharedService.showAlert(
                'No se pudo eliminar la especialidad',
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

  aplicarFiltroListado(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
   if(this.dataSource.paginator){
    this.dataSource.paginator.firstPage();
   }
  }

  ngOnInit(): void {
    this.getSpecialities();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginaciontabla;
  }

}

