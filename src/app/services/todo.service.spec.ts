import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty todo list', () => {
    const todos = service.todos();

    expect(todos.length).toBe(0);
  });

  it('should add a new todo', () => {
    const todoText = 'New Todo';

    service.addTodo(todoText);
    const todos = service.todos();

    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe(todoText);
    expect(todos[0].id).toBeDefined();
  });

  it('should add multiple todos', () => {
    const todoText1 = 'First Todo';
    const todoText2 = 'Second Todo';

    service.addTodo(todoText1);
    service.addTodo(todoText2);
    const todos = service.todos();

    expect(todos.length).toBe(2);
    expect(todos[0].text).toBe(todoText1);
    expect(todos[1].text).toBe(todoText2);
  });

  it('should not add todo with empty text', () => {
    service.addTodo('');
    const todos = service.todos();

    expect(todos.length).toBe(0);
  });
});
