import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TodoService } from '../../services';
import type { Todo } from '../../interfaces';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  public todos: WritableSignal<Todo[]> = signal<Todo[]>([]);
  
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todos = this.todoService.todos;
  }
}
