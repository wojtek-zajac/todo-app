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

  public addTodo(text: string): void {
    if (text.trim()) {
      this._todos.update(todos => [...todos, { id: crypto.randomUUID(), text }]);
    }
  }
}
