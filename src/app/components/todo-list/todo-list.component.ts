import { Component, type Signal } from '@angular/core';
import { TodoService } from '../../services';
import type { Todo } from '../../interfaces';
import { CustomCheckboxComponent } from '../custom-checkbox/custom-checkbox.component';
import { CommonModule } from '@angular/common';
import { TodoFilter } from '../../enums';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, CustomCheckboxComponent, CdkDropList, CdkDrag],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  public filteredTodos: Signal<Todo[]>;
  public todos: Signal<Todo[]>;
  public activeCount: Signal<number>;
  public filter: Signal<string>;

  public TodoFilter = TodoFilter;

  constructor(private todoService: TodoService) {
    this.filteredTodos = this.todoService.filteredTodos;
    this.todos = this.todoService.todos;
    this.activeCount = this.todoService.activeCount;
    this.filter = this.todoService.filter;
  }

  public deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }

  public toggleCompletion(id: string): void {
    this.todoService.toggleTodoCompletion(id);
  }

  public setFilter(filter: string): void {
    this.todoService.setFilter(filter);
  }

  public clearCompleted(): void {
    this.todoService.clearCompleted();
  }

  public drop(event: CdkDragDrop<Todo[]>): void {
    moveItemInArray(this.todos(), event.previousIndex, event.currentIndex);
  }
}
