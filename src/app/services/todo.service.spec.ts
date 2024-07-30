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
    const completed = false;

    service.addTodo(todoText, completed);
    const todos = service.todos();

    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe(todoText);
    expect(todos[0].completed).toBe(completed);
    expect(todos[0].id).toBeDefined();
  });

  it('should add multiple todos', () => {
    const todoText1 = 'First Todo';
    const todoText2 = 'Second Todo';
    const completed1 = false;
    const completed2 = true;

    service.addTodo(todoText1, completed1);
    service.addTodo(todoText2, completed2);
    const todos = service.todos();

    expect(todos.length).toBe(2);
    expect(todos[0].text).toBe(todoText1);
    expect(todos[0].completed).toBe(completed1);
    expect(todos[1].text).toBe(todoText2);
    expect(todos[1].completed).toBe(completed2);
  });

  it('should not add todo with empty text', () => {
    service.addTodo('', false);
    const todos = service.todos();

    expect(todos.length).toBe(0);
  });

  it('should toggle todo completion status', () => {
    const todoText = 'Toggle Todo';
    const initialCompleted = false;

    service.addTodo(todoText, initialCompleted);
    const todos = service.todos();
    const addedTodoId = todos[0].id;

    service.toggleTodoCompletion(addedTodoId);
    const updatedTodos = service.todos();
    const updatedTodo = updatedTodos.find(todo => todo.id === addedTodoId);

    expect(updatedTodo).toBeTruthy();
    expect(updatedTodo?.completed).toBe(!initialCompleted);

    service.toggleTodoCompletion(addedTodoId);
    const finalTodos = service.todos();
    const finalTodo = finalTodos.find(todo => todo.id === addedTodoId);

    expect(finalTodo).toBeTruthy();
    expect(finalTodo?.completed).toBe(initialCompleted);
  });
});

