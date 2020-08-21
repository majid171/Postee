import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  showErrorMessage: boolean;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.showErrorMessage = false;

    this.signupForm = this.fb.group({
      first: new FormControl('', [Validators.required]),
      last: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required])
    });
  }

  submit(): void {
    console.log('clicked')
    this.auth.register(this.signupForm.value).subscribe((res) => {
      this.router.navigate(['']);
    }, error => {
      console.log(error);
    });
  }

}
