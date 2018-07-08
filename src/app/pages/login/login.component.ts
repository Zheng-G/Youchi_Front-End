import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ProfileService} from '../../services/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder, private profile:ProfileService, private router:Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    
    this.profile.isLoggedIn().subscribe(result => this.router.navigate(['/']));
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    
    if (this.form.valid) {
      this.profile
        .login(this.email.value, this.password.value)
        .subscribe(result => this.router.navigate(['/']));      // your code goes here
    }
  }
}
