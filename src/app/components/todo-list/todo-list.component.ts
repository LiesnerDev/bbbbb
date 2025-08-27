import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  addTodo(): void {
    const trimmedTitle = this.newTodoTitle.trim();
    if (!trimmedTitle) {
      return;
    }
    const newTodo: Todo = {
      id: new Date().getTime(),
      title: trimmedTitle,
      completed: false
    };
    this.todos.push(newTodo);
    this.todoService.saveTodos(this.todos);
    this.newTodoTitle = '';
  }

  toggleTodo(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo);
  }

  removeTodo(todo: Todo): void {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.todoService.removeTodo(todo.id);
  }
}
