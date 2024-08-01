import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../../services';
import { Todo } from '../../interfaces';
import { CustomCheckboxComponent } from '../custom-checkbox/custom-checkbox.component';
import { signal } from '@angular/core';

class MockTodoService {
  todos = signal<Todo[]>([]);
  filteredTodos = signal<Todo[]>([]);
  activeCount = signal<number>(0);
  filter = signal<string>('all');

  deleteTodo = jasmine.createSpy('deleteTodo');
  toggleTodoCompletion = jasmine.createSpy('toggleTodoCompletion');
  setFilter = jasmine.createSpy('setFilter');
  clearCompleted = jasmine.createSpy('clearCompleted');
}

// TODO: Fix the tests
xdescribe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockTodoService: MockTodoService;

  beforeEach(async () => {
    mockTodoService = new MockTodoService();
    mockTodoService.todos = signal<Todo[]>([{ id: '1', text: 'Test Todo', completed: false }]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, CustomCheckboxComponent, TodoListComponent],
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
    const testTodos: Todo[] = [{ id: '1', text: 'Test Todo', completed: false }];
    mockTodoService.todos = signal(testTodos);
    fixture.detectChanges();

    expect(component.todos()).toEqual(testTodos);
  });

  it('should render "No todos yet" message when there are no todos', () => {
    mockTodoService.todos = signal([]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const noTodosMessage = compiled.querySelector('.todo-list__empty-state');

    expect(noTodosMessage).toBeTruthy();
    expect(noTodosMessage?.textContent).toContain('No todos yet. Add one!');
  });

  it('should render todos in the template when there are todos', () => {
    const testTodos: Todo[] = [
      { id: '1', text: 'First Todo', completed: false },
      { id: '2', text: 'Second Todo', completed: true }
    ];
    mockTodoService.todos = signal(testTodos);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('.todo-list__item');

    expect(listItems.length).toBe(testTodos.length);
    expect(listItems[0].querySelector('.todo-list__text')?.textContent).toContain('First Todo');
    expect(listItems[1].querySelector('.todo-list__text')?.textContent).toContain('Second Todo');
  });

  it('should call deleteTodo when the delete button is clicked', () => {
    const testTodos: Todo[] = [
      { id: '1', text: 'First Todo', completed: false }
    ];
    mockTodoService.todos = signal(testTodos);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const deleteButton = compiled.querySelector('.todo-list__item .todo-list__delete-button') as HTMLButtonElement;

    expect(deleteButton).toBeTruthy();
    deleteButton.click();
    fixture.detectChanges();

    expect(mockTodoService.deleteTodo).toHaveBeenCalledWith('1');
  });
});
