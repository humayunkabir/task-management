import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  all(): Task[] {
    return this.taskService.all();
  }

  @Get(':id')
  single(@Param('id') id: string): Task | undefined {
    return this.taskService.single(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.create(createTaskDto);
  }
}
