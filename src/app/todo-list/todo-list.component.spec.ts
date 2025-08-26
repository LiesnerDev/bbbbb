import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;

  beforeEach(() => {
    component = new TodoListComponent();
  });

  describe('addTask', () => {
    it('should add task when newTask is not empty', () => {
      component.newTask = 'Comprar leite';
      component.addTask();

      expect(component.tasks.length).toBe(1);
      expect(component.tasks[0]).toBe('Comprar leite');
      expect(component.newTask).toBe('');
    });

    it('should not add task when newTask is empty or whitespace', () => {
      component.newTask = '   ';
      component.addTask();

      expect(component.tasks.length).toBe(0);
    });
  });

  describe('removeTask', () => {
    it('should remove a task from the tasks array', () => {
      component.tasks = ['Task 1', 'Task 2', 'Task 3'];
      
      component.removeTask(1);
      
      expect(component.tasks.length).toBe(2);
      expect(component.tasks).toEqual(['Task 1', 'Task 3']);
    });
  });
});
