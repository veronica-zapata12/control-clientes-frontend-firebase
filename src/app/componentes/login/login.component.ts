import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Login } from 'src/app/modelo/login.model';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private flashMessages: FlashMessagesService,
    private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(
      auth => {
        if (auth) {
          this.router.navigate(['/'])
        }
      }
    )
  }

  get f() {
    return this.loginForm.controls;
  }
  login(form: Login) {
    this.loginService.login(form)
      .then(res => {
        this.router.navigate(['/'])
      })
      .catch(error => {
        this.flashMessages.show(error.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
  }

}
