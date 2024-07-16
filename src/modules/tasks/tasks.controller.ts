import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { Task as TaskEntity } from './task.entity';
import { TaskDto, updateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async findAll() {
    // get all posts in the db
    return await this.taskService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user')
  async findbyUser(@Param('userId') id: number, @Request() req) {
    // find the post with this id
    return await this.taskService.findbyUser(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TaskEntity> {
    // find the post with this id
    const task = await this.taskService.findOne(id);

    // if the post doesn't exit in the db, throw a 404 error
    if (!task) {
      throw new NotFoundException("This task doesn't exist");
    }

    // if post exist, return the post
    return task;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() task: TaskDto, @Request() req): Promise<TaskEntity> {
    // create a new post and return the newly created post
    return await this.taskService.create(task, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() task: updateTaskDto,
  ): Promise<TaskEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedTask } = await this.taskService.update(
      id,
      task,
    );

    // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return the updated post
    return updatedTask;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    // delete the post with this id
    const deleted = await this.taskService.delete(id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
