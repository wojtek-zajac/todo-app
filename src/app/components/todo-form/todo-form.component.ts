import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../services';
import { CustomCheckboxComponent } from '../custom-checkbox/custom-checkbox.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, CustomCheckboxComponent],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  public todoForm: FormGroup;
  public isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.fb.group({
      text: ['', Validators.required],
      completed: [false]
    });
  }

  public addTodo(): void {
    this.isSubmitted = true;
      if (this.todoForm.valid) {
      const { text, completed } = this.todoForm.value;

      if (text.trim() !== '') {
        this.todoService.addTodo(text, completed);       
        this.todoForm.reset();
        this.isSubmitted = false;
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

  get textControl(): AbstractControl<any, any> | null {
    return this.todoForm.get('text');
  }

  get isTextInvalid(): boolean | undefined {
    const textControl = this.textControl;

    return this.isSubmitted && (textControl?.invalid && (textControl.touched || textControl.dirty));
  }
}
