import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskInput: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (this.taskInput.trim()) {
      this.taskService.addTask(this.taskInput);
      this.taskInput = '';
    }
  }

  removeTask(taskId: number): void {
    this.taskService.removeTask(taskId);
  }
}
