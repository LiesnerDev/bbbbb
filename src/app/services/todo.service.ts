import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private localStorageKey = 'todos';

  getTodos(): Todo[] {
    const todosString = localStorage.getItem(this.localStorageKey);
    return todosString ? JSON.parse(todosString) : [];
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }

  addTodo(todo: Todo): void {
    const todos = this.getTodos();
    todos.push(todo);
    this.saveTodos(todos);
  }

  updateTodo(updatedTodo: Todo): void {
    const todos = this.getTodos().map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
    this.saveTodos(todos);
  }

  removeTodo(id: number): void {
    const todos = this.getTodos().filter(todo => todo.id !== id);
    this.saveTodos(todos);
  }
}
