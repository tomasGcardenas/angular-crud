import { getLocaleId } from '@angular/common';
import { Component} from '@angular/core';
import { addDoc } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { identity } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';


@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent {
  empleados: any[] = [];



  constructor(private _empleadoService: EmpleadoService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados(){
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element:any) => {
        this.empleados.push({
          id: element.id,
          ... element
        })
      });
      console.log(this.empleados);
    })
  }

  eliminarEmpleado(id:string) {
    this._empleadoService.eliminarEmpleado(id).then(() => {
      console.log('empleado eliminado con exito');
      this.toastr.error('El empleado fue eliminado con exito', 'Registro eliminado', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }

}
