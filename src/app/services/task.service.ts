import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id: number;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  tasks$ = this.tasksSubject.asObservable();

  addTask(taskText: string): void {
    if (!taskText.trim()) {
      return;
    }
    const newTask: Task = {
      id: new Date().getTime(),
      text: taskText.trim()
    };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
  }

  removeTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.tasksSubject.next(this.tasks);
  }
}
