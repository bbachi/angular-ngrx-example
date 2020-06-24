import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as userActions from '../app-state/actions';
import * as fromRoot from '../app-state';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private readonly store: Store) {
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      console.log('data::::', data);
      if (data.isLoadingSuccess && data.result.status) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  model: User = new User();
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm) {
    console.log(this.model)
    this.store.dispatch(userActions.login({user: { email: this.model.email, password: this.model.password }}));
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
}

}

export class User {

  constructor(

  ) {  }

  public email: string;
  public password: string;

}
