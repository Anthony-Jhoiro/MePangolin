import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {faUndoAlt} from "@fortawesome/free-solid-svg-icons";
import {FriendsService} from "../services/friends.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // icons
  returnIcon = faUndoAlt;

  registerForm: FormGroup;
  createFriend = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private friendService: FriendsService
  ) { }

  ngOnInit(): void {
    if (this.router.url == '/create') {
      this.createFriend = true;
    }

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
      if (this.createFriend) {
        this.friendService.createFriend(data)
          .subscribe(() => this.router.navigate(['/pangolins']));

      } else {
        this.authenticationService.register(data)
          .subscribe(() => this.router.navigate(['/pangolins']));
      }

    }
  }

}
