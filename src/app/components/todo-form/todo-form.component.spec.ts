import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
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
      imports: [TodoFormComponent, ReactiveFormsModule],
      providers: [{ provide: TodoService, useValue: mockTodoService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty form control', () => {
    expect(component.todoControl.value).toBe('');
    expect(component.todoControl.valid).toBeFalsy;
  });

  it('should call addTodo on TodoService when addTodo is called with valid input', () => {
    const todoText = 'Test Todo';
    component.todoControl.setValue(todoText);
    component.addTodo();

    expect(mockTodoService.addTodo).toHaveBeenCalledOnceWith(todoText);
    expect(component.todoControl.value).toBeNull();
  });

  it('should reset form control after adding a todo', () => {
    component.todoControl.setValue('Test Todo');
    component.addTodo();

    expect(component.todoControl.value).toBeNull();
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
});
