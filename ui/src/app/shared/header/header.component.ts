import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userActions from '../../app-state/actions';
import * as fromRoot from '../../app-state';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as storage from '../../app-state/state/storage';

@Component({
  selector: 'app-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  user: any;

  constructor(private readonly store: Store, private router: Router) {
    this.store.select(fromRoot.getLoggedInUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      console.log('in the header:::', data)
      this.user = data.user;
    });
  }

  logout() {
    storage.clearStorage();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
