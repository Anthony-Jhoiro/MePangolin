import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
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
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  /**
   * Called from the template
   * If the form is valid, send the data to the service to try to log the pangolin with his credentials.
   * If it succeeds, it redirects to '/pangolins'.
   */
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
