import { OnInit, OnDestroy, AfterViewInit, Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Empleado } from '../empleado';
import { Subject } from 'rxjs';
import { BarraNavComponent } from '../barra-nav/barra-nav.component';


declare var $: any;

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit, OnDestroy, AfterViewInit {
  
  empleados: Empleado[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('tabla', { static: false }) tabla!: ElementRef | undefined;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json',
      },
    };
  }

  ngAfterViewInit(): void {
    this.LoadEmpleados();
  }

  LoadEmpleados() {
    this.apiService.leerEmpleados().subscribe((data: Empleado[]) => {
      this.empleados = data;
      this.dtTrigger.next(null);
      this.cdr.detectChanges();

      if (this.tabla && !$.fn.DataTable.isDataTable(this.tabla.nativeElement)) {
        $(this.tabla.nativeElement).DataTable(this.dtOptions);
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  editarEmpleado() {
   
  }

  borrarEmpleado() {
    
  }
}


