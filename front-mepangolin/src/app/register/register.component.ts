import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(0)]),
      family: new FormControl('', Validators.required),
      race: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirm: new FormControl('', Validators.required),
      food: new FormControl([])
    });
  }

  submitRegisterForm() {
    if (this.registerForm.valid) {
      let data = this.registerForm.value;
      data.food = data.food.map(f=>f.value);
      this.authenticationService.register(data)
        .subscribe(() => this.router.navigate(['/pangolins']));
    }
  }

}
