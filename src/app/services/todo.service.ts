import { computed, Injectable, type Signal, signal, type WritableSignal } from '@angular/core';
import type { Todo } from '../interfaces';
import { TodoFilter } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todos: WritableSignal<Todo[]> = signal<Todo[]>([]);
  private _filter: WritableSignal<string> = signal(TodoFilter.All);

  public todos: Signal<Todo[]> = computed(() => this._todos());
  public filter: Signal<string> = computed(() => this._filter());

  public filteredTodos: Signal<Todo[]> = computed(() => {
    switch (this._filter()) {
      case TodoFilter.Active:
        return this._todos().filter(todo => !todo.completed);
      case TodoFilter.Completed:
        return this._todos().filter(todo => todo.completed);
      case TodoFilter.All:
      default:
        return this._todos();
    }
  });

  public activeCount: Signal<number> = computed(() => this._todos().filter(todo => !todo.completed).length);

  public addTodo(text: string, completed: boolean = false): void {
    if (text.trim()) {
      this._todos.update(todos => [
        ...todos,
        { id: crypto.randomUUID(), text, completed },
      ]);
    }
  }

  public deleteTodo(id: string): void {
    this._todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  public toggleTodoCompletion(id: string): void {
    this._todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  public clearCompleted(): void {
    this._todos.update(todos => todos.filter(todo => !todo.completed));
  }

  public setFilter(filter: string): void {
    this._filter.set(filter);
  }
}
