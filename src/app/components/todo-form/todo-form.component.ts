import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../services';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  public todoControl = new FormControl('', Validators.required);

  constructor(private todoService: TodoService) {}

  public addTodo(): void {
    const text = this.todoControl.value?.trim();

    if (text) {
      this.todoService.addTodo(text);
      this.todoControl.reset();
    }
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTodo();
    }
  }
}
