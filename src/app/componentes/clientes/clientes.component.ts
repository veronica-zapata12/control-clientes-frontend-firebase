import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[];
  clientesForm:FormGroup;
@ViewChild("botonCerrar") botonCerrar:ElementRef;
  constructor(private clientesServicio:ClientesService, private flashMessages:FlashMessagesService) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.clientesServicio.getClientes().subscribe(
      clientes =>{
        this.clientes=clientes;        
      }
    )
  }
  construirFormulario(){
  this.clientesForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [Validators.required,Validators.minLength(2)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    saldo: new FormControl('', Validators.required)
  });
  }


  getSaldoTotal(){
    let saldoTotal:number=0;
    if(this.clientes ){
      this.clientes.forEach(clientes =>{
        saldoTotal +=clientes.saldo;
      })
    }
    return saldoTotal;
  }
get f(){
  return this.clientesForm.controls;
}
submit(){
  if(this.clientesForm.valid){
    this.clientesServicio.agregarCliente(this.clientesForm.value);
    this.construirFormulario();
    this.cerrarModal();
    
  }else
  this.clientesForm.markAllAsTouched();
  this.flashMessages.show("por favor llena el formulario correctamente",{
    cssClass:'alert-danger',timeout:4000
  }
  );
}
private cerrarModal(){
  this.construirFormulario();
  this.botonCerrar.nativeElement.click();
}
}
