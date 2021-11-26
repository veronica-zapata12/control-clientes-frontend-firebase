import { noop } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  clientesForm:FormGroup;
  cliente:Cliente;
  id:string;
  constructor(private clientesServicio:ClientesService,
     private flashMessages:FlashMessagesService,
     private router:Router, private route:ActivatedRoute) {
      this.clientesForm = new FormGroup({
        id:new FormControl(''),
        nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
        apellido: new FormControl('', [Validators.required,Validators.minLength(2)]),
        email: new FormControl('', [Validators.required,Validators.email]),
        saldo: new FormControl('', Validators.required)
      });
      }
  

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    
    this.clientesServicio.getCliente(this.id).subscribe(cliente=>{
      this.cliente=cliente;
        this.construir();
    });
  }

  construir(){
    this.clientesForm = new FormGroup({
      id:new FormControl(this.id),
      nombre: new FormControl(this.cliente.nombre, [Validators.required, Validators.minLength(2)]),
      apellido: new FormControl(this.cliente.apellido, [Validators.required,Validators.minLength(2)]),
      email: new FormControl(this.cliente.email, [Validators.required,Validators.email]),
      saldo: new FormControl(this.cliente.saldo, Validators.required)
    });
  }

    get f(){
      return this.clientesForm.controls;
    }

    guardar(){
      if(this.clientesForm.valid){
        this.clientesServicio.modificarCliente(this.clientesForm.value);
        this.router.navigate(['/']);
        
      }else
      this.clientesForm.markAllAsTouched();
      this.flashMessages.show("por favor llena el formulario correctamente",{
        cssClass:'alert-danger',timeout:4000
      }
      );
    }
    eliminar(){
      if(confirm('seguro que desea eliminar el cliente?')){
        this.clientesServicio.eliminarCliente(this.clientesForm.value);
        this.router.navigate(['/'])
      }
    }
}
