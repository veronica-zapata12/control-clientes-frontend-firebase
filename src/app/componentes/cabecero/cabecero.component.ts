import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {
isloggedIn: boolean;
loggedInUser: string;
permitirRegistro:boolean;
  constructor(private router:Router, 
    private loginService:LoginService,
     private configuracionService:ConfiguracionService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(
      auth=>{
        if(auth){
          this.isloggedIn=true;
          this.loggedInUser=auth.email;
        }else{
          this.isloggedIn=false;
        }
      }
    );
    this.configuracionService.getConfiguracion().subscribe(
      configuracion =>{
        this.permitirRegistro=configuracion.permitirRegistro;
      }
    );
  }
  logout(){
    this.loginService.logout();
    this.isloggedIn=false;
    this.router.navigate(['/login']);
  }

}
