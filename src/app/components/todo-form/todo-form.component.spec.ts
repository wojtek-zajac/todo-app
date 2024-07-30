import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from './todo-form.component';
import { TodoService } from '../../services';

class MockTodoService {
  addTodo = jasmine.createSpy('addTodo');
}

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let mockTodoService: MockTodoService;

  beforeEach(async () => {
    mockTodoService = new MockTodoService();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TodoFormComponent],
      providers: [{ provide: TodoService, useValue: mockTodoService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty form and invalid text control', () => {
    const textControl = component.textControl;
    expect(textControl?.value).toBe('');
    expect(textControl?.valid).toBeFalse();
  });

  it('should call addTodo on TodoService when addTodo is called with valid input', () => {
    const todoText = 'Test Todo';
    component.todoForm.setValue({ text: todoText, completed: false });
    component.addTodo();

    expect(mockTodoService.addTodo).toHaveBeenCalledOnceWith(todoText, false);
  });

  it('should reset form after adding a todo', () => {
    component.todoForm.setValue({ text: 'Test Todo', completed: false });
    component.addTodo();

    expect(component.todoForm.controls['text'].value).toBeNull();
    expect(component.todoForm.controls['completed'].value).toBeNull();
    expect(component.isSubmitted).toBe(false);
  });

  it('should call addTodo when Enter key is pressed', () => {
    spyOn(component, 'addTodo');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeyDown(event);

    expect(component.addTodo).toHaveBeenCalled();
  });

  it('should not call addTodo when a different key is pressed', () => {
    spyOn(component, 'addTodo');
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    component.onKeyDown(event);

    expect(component.addTodo).not.toHaveBeenCalled();
  });

  it('should show validation error when form is submitted with invalid input', () => {
    component.todoForm.controls['text'].setValue('');
    component.addTodo();

    expect(component.isTextInvalid).toBeTrue();
  });
});
