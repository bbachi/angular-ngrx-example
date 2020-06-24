import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../_services';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as todoActions from '../app-state/actions';
import * as fromRoot from '../app-state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  tasks: any[] = [];

  constructor(private router: Router, private readonly store: Store) {
    this.store.select(fromRoot.getLoggedInUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      console.log('in the dashboard:::', data);
      this.user = data.user;
    });

    this.store.select(fromRoot.getTasks).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      console.log('in the dashboard:::', data);
      if (data.isLoadingSuccess) {
        this.tasks = data.tasks;
      }
    });
  }

  todoForm = new FormGroup({
    task: new FormControl('', Validators.nullValidator && Validators.required),
    assignee: new FormControl('', Validators.nullValidator && Validators.required),
    status: new FormControl('', Validators.nullValidator && Validators.required)
  });

  destroy$: Subject<boolean> = new Subject<boolean>();

  onSubmit() {
    console.log(this.todoForm.value);
    const task = {
      createdBy: this.user.email,
      task: this.todoForm.value.task,
      assignee: this.todoForm.value.assignee,
      status: this.todoForm.value.status
    };
    this.store.dispatch(todoActions.createTask({task}));
    this.todoForm.reset();
  }

  deleteTask(taskid: number) {
    console.log('deleting this task:::', taskid);
    /*this.todoService.deleteTask(taskid).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      this.getTasks();
    });*/
  }

  editTask(task: any) {
    console.log('editing this task:::', task);
    /*this.todoService.editTask(task).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      this.getTasks();
    });*/
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
  }

}
