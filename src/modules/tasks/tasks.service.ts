import { Injectable, Inject } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskDto } from './dto/task.dto';
import { User } from '../users/user.entity';
import { TASK_REPOSITORY } from '../../core/constants';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: typeof Task,
  ) {}

  async create(task: TaskDto, userId): Promise<Task> {
    return await this.taskRepository.create<Task>({ ...task, userId });
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.findAll<Task>({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findbyUser(userId): Promise<Task[]> {
    return await this.taskRepository.findAll<Task>({
      where: { userId },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOne(id): Promise<Task> {
    return await this.taskRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id) {
    return await this.taskRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const [numberOfAffectedRows, [updatedTask]] =
      await this.taskRepository.update(
        { ...data },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedTask };
  }
}
