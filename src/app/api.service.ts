import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Empleado } from "./empleado";
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    
    dbUrl: string = "https://backend-visioncorp-production-f74c.up.railway.app";
    router: any;
    constructor(private httpClient: HttpClient) {}

    public userRegistro(NombreUsuario: any, correoElectronico: any, Password: any, ClaveDeRegistro: any) {
        console.log(NombreUsuario);
        return this.httpClient.post<any>(this.dbUrl + '/registro.php', {
            NombreUsuario, correoElectronico, Password, ClaveDeRegistro
           
        }).pipe(map(Users => {
            return Users;
        }));
    }

    public userLogin(correoElectronico:any, Password:any){
        return this.httpClient.post<any>(this.dbUrl + '/login.php', {
            correoElectronico, Password
        }).pipe(map(Users => {
            this.setToken(Users.token);
            return Users;
        }));
    }

    setToken(token: string){
        localStorage.setItem('token', token);
    }

    public crearEmpleado(empleado: Empleado) {
        return this.httpClient.post<any>(this.dbUrl + '/crearEmpleado.php', empleado)
          .pipe(
            catchError((error) => {
              console.error('Error al crear el empleado:', error);
              return throwError(() => error);
            })
          );
    }
      

    public leerEmpleados() {
        return this.httpClient.get<Empleado[]>(this.dbUrl + '/leerEmpleados.php')
            .pipe(map(empleados => empleados));
    }

}
