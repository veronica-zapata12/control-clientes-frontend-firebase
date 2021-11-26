
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/internal/operators/map';
import { Login } from '../modelo/login.model';

@Injectable()
export class LoginService {


  constructor(private authService: AngularFireAuth) { }

  login(login: Login) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(login.email, login.password)
        .then(datos => resolve(datos),
          error => reject(error)

        )
    })
  }
  getAuth() {
    return this.authService.authState.pipe(
      map(auth => auth)
    )
  }
  logout() {
    this.authService.signOut();
  }
  registrarse(registro:Login){
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(registro.email, registro.password)
        .then(datos => resolve(datos),
          error => reject(error)

        )
    })
  }
}
