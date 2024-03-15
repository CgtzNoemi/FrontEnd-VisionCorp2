import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Empleado } from '../empleado';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrl: './detalle-empleado.component.css'
})
export class DetalleEmpleadoComponent {
  empleado: Empleado = {
    id: undefined,
    EmpleadoID: 0,
    Nombre: '',
    Apellido: '',
    Edad: 0,
    correoElectronico: '',
    Telefono: '',
    Puesto: '',
    Departamento: '',
    FechaIngreso: ''
  };
  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.apiService.obtenerEmpleadoPorId(id).subscribe(empleado => {
        this.empleado = empleado;
      });
    });
  }

}
