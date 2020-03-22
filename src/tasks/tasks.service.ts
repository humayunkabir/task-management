import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [];

  all(): any[] {
    return this.tasks;
  }
}
