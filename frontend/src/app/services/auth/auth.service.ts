import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(form): void{
    console.log(form);
  }

  signup(form): void{
    console.log(form);
  }
}
