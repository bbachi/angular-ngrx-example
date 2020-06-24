import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  gotoModule(moduleName: string) {
    if (moduleName === 'todos') {
      window.location.href = `${environment}/todos`
    } else if (moduleName === 'tasks') {
      window.location.href = `${environment}/tasks`
    }
  }

}
