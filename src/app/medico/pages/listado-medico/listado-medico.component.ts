import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Medico } from '../../interfaces/medico';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MedicoService } from '../../services/medico.service';
import { SharedService } from '../../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalMedicoComponent } from '../../modales/modal-medico/modal-medico.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-medico',
  templateUrl: './listado-medico.component.html',
  styleUrl: './listado-medico.component.css'
})
export class ListadoMedicoComponent implements OnInit, AfterViewInit {

  displayedColumns : string[] = [
    'apellido',
    'nombre',
    'telefono',
    'genero',
    'nameSpeciality',
    'estado',
    'acciones'
  ];

  dataInicial: Medico[] = [];
  dataSource = new MatTableDataSource(this.dataInicial);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _medicosService: MedicoService,
    private _sharedService : SharedService,
    private dialog: MatDialog 
  ){}

  getMedicos(){
    this._medicosService.list().subscribe({
      next:(data) => {
        if(data.isSuccess)
          {
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator = this.paginator;
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

  newMedico(){
    this.dialog
        .open(ModalMedicoComponent, {disableClose: true, width: '600px'})
        .afterClosed()
        .subscribe((result) => {
          if(result === 'true') this.getMedicos();
        })
    }

    editMedico(medico: Medico){
      this.dialog
      .open(ModalMedicoComponent, {disableClose: true, width: '600px', data: medico})
      .afterClosed()
      .subscribe((result) => {
        if(result === 'true') this.getMedicos();
      })
    }

    removeMedico(med: Medico) {
      Swal.fire({
        title: 'Desea Eliminar el Medico?',
        text: med.apellido+ ' ' + med.nombre,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(med)
          this._medicosService.delete(med.id).subscribe({
            next: (data) => {
              if (data.isSuccess) {
                this._sharedService.showAlert(
                  'Medico fue eliminado',
                  'Completo'
                );
                this.getMedicos();
              } else {
                this._sharedService.showAlert(
                  'No se pudo eliminar el Medico',
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
    this.getMedicos();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
