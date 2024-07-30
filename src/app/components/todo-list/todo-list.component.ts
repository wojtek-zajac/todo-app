import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TodoService } from '../../services';
import type { Todo } from '../../interfaces';
import { CustomCheckboxComponent } from '../custom-checkbox/custom-checkbox.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, CustomCheckboxComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  public todos: WritableSignal<Todo[]> = signal<Todo[]>([]);
  
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todos = this.todoService.todos;
  }
  
  public deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.todos;
  }

  public toggleCompletion(id: string): void {
    this.todoService.toggleTodoCompletion(id);
  }
}
