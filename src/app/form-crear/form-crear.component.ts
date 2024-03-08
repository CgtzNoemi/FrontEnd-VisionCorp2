import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-crear',
  templateUrl: './form-crear.component.html',
  styleUrl: './form-crear.component.css'
})
export class FormCrearComponent {
  formulario: FormGroup;

  opcionesDePuestos = {
    Finanzas: ['Contador Senior', 'Analista Financiero', 'Especialista en Impuestos', 'Gestor de Tesorería'],
    Legal: ['Abogado Principal', 'Especialista en Propiedad Intelectual', 'Especialista en Contratos', 'Abogado de Cumplimiento', 'Abogado de Litigios'],
    Marketing: ['Director de Marketing', 'Especialista en Estrategia de Contenidos', 'Especialista en SEO/SEM', 'Gerente de Eventos', 'Analista de Investigación de Mercado']
  };

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.formulario = this.fb.group({
      Nombre: ['', [Validators.required, Validators.minLength(3)]],
      Apellido: ['', [Validators.required, Validators.minLength(3)]],
      Edad: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      CorreoElectronico: ['', [Validators.required, Validators.email]],
      Telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      Puesto: ['', [Validators.required]],
      Departamento: ['', [Validators.required]],
      FechaIngreso: ['', [Validators.required]],
    });
  }

  crearEmpleado() {
    if (this.formulario.valid) {
      this.apiService.crearEmpleado(this.formulario.value).subscribe({
        next: (response: any) => {
          console.log(response.mensaje);
          this.router.navigate(['/lista-usuarios']); // Redirección aquí
        },
        error: (error) => {
          console.error('Error al crear el empleado:', error);
        }
      });
    }
  }
  
  
}
