import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showErrorMessage: boolean;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.showErrorMessage = false;

    this.loginForm = this.fb.group({
      email: new FormControl('majid@gmail.com', [Validators.required]),
      password: new FormControl('password', [Validators.required])
    });
  }

  submit(): void {

    const stringField = JSON.stringify(this.loginForm.value);
    const jsonField = JSON.parse(stringField);

    this.auth.login(jsonField).subscribe((res) =>{
      console.log(res);
      this.router.navigate(['']);
    }, error =>{
      console.log(error)
    });
  }

}
