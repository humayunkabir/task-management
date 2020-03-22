import { Injectable } from '@nestjs/common';
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

  allTasks(): Task[] {
    return this.tasks;
  }

  filteredTasks(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.allTasks();

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

  single(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  create(createTaskDto: CreateTaskDto): Task {
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

  delete(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const task = this.single(id);
    const updatedTask = { ...task, status };

    this.tasks = this.tasks.map(task => (task.id === id ? updatedTask : task));
    return updatedTask;
  }
}
