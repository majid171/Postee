import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showErrorMessage: boolean;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.showErrorMessage = false;

    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

  }

  submit(): void {
    this.auth.login(this.loginForm.value);
  }

}
