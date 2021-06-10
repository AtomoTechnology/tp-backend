import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/auth/task.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private task: TaskService) { }

  ngOnInit(): void {
    this.task.doLogoutUser();

  }

}
