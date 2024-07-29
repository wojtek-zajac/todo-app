import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../services';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  public todoForm: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.fb.group({
      text: ['', Validators.required],
      completed: [false]
    });
  }

  public addTodo(): void {
    if (this.todoForm.valid) {
      const { text, completed } = this.todoForm.value;

      if (text.trim() !== '') {
        this.todoService.addTodo(text, completed);
        this.todoForm.reset();
      }
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTodo();
    }
  }

  get textControl() {
    return this.todoForm.get('text');
  }

  get isTextInvalid() {
    const textControl = this.textControl;
    return textControl?.invalid && (textControl.touched || textControl.dirty);
  }
}
