import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {log} from "util";
import {catchError, } from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: new FormControl('p', Validators.required),
      password: new FormControl('p', Validators.required)
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.authenticationService.login(data.login, data.password)
        .subscribe(data => {
          this.router.navigate(['/pangolins']);
        }, err => console.error(err));
    }
  }

}
