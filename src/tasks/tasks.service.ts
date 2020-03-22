import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '53ed0320-6c1b-11ea-8da0-812243f7ed03',
      title: 'NestJS',
      description: 'is the best',
      status: TaskStatus.OPEN,
    },
    {
      id: '603e64c0-6c1b-11ea-8da0-812243f7ed03',
      title: 'JavaScript',
      description: 'is not the same',
      status: TaskStatus.DONE,
    },
    {
      id: '6bcac8b0-6c1b-11ea-8da0-812243f7ed03',
      title: 'TypeScript',
      description: 'is quite fun',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  getSingleTask(id: string): Task {
    const foundTask = this.tasks.find(task => task.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Requested Task doesn't exist`);
    }

    return foundTask;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    const foundTask = this.getSingleTask(id);
    this.tasks = this.tasks.filter(task => task.id !== foundTask.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getSingleTask(id);
    const updatedTask = { ...task, status };

    this.tasks = this.tasks.map(task => (task.id === id ? updatedTask : task));
    return updatedTask;
  }
}
