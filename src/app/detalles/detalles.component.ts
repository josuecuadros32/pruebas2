import { ActivatedRoute, Params } from '@angular/router';
import { Empleado } from './../equipo/empleado';
import { EquipoService } from './../equipo/equipo.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  constructor(private equipo: EquipoService, private router: ActivatedRoute ) { }
  public empleado: Empleado = {};

  ngOnInit() {
     const id = this.router.snapshot.params['id'];
     this.getDetalles(id);
  }


  getDetalles(id: string): void {
    this.equipo.getOneEmpleado(id).subscribe(empleado => {
      this.empleado = empleado;
  });
}
  getUrl() {
    return 'url("../../assets/imagenes/fondo3.jpg")';
  }

}

