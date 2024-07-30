import { Injectable, signal, type WritableSignal } from '@angular/core';
import type { Todo } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todos: WritableSignal<Todo[]> = signal<Todo[]>([]);

  get todos() {
    return this._todos;
  }

  public addTodo(text: string, completed: boolean): void {
    if (text.trim()) {
      this._todos.update(todos => [
        ...todos, {
          id: crypto.randomUUID(),
          text,
          completed
        }
      ]);
    }
  }

  public deleteTodo(id: string): void {
    this._todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  public toggleTodoCompletion(id: string): void {
    this._todos.update(todos => todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }  
}
