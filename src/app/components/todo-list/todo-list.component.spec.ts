import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { signal } from '@angular/core';
import { TodoService } from '../../services';
import type { Todo } from '../../interfaces';

class MockTodoService {
  todos = signal<Todo[]>([]);
}

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockTodoService: MockTodoService;

  beforeEach(async () => {
    mockTodoService = new MockTodoService();

    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [{ provide: TodoService, useValue: mockTodoService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize todos signal with TodoService.todos', () => {
    const testTodos: Todo[] = [{ id: '1', text: 'Test Todo' }];

    mockTodoService.todos = signal(testTodos);
    component.ngOnInit();

    expect(component.todos()).toEqual(testTodos);
  });

  it('should render "No todos yet" message when there are no todos', () => {
    mockTodoService.todos = signal([]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const noTodosMessage = compiled.querySelector('p');

    expect(noTodosMessage).toBeTruthy();
    expect(noTodosMessage?.textContent).toContain('No todos yet. Add one!');
  });

  it('should render todos in the template when there are todos', () => {
    const testTodos: Todo[] = [
      { id: '1', text: 'First Todo' },
      { id: '2', text: 'Second Todo' }
    ];
    mockTodoService.todos = signal(testTodos);
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('ul li');

    expect(listItems.length).toBe(testTodos.length);
    expect(listItems[0].textContent).toContain('First Todo');
    expect(listItems[1].textContent).toContain('Second Todo');
  });
});
