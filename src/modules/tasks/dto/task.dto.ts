import { IsNotEmpty, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

enum Status {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export class TaskDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly expiration_date: Date;

  @IsNotEmpty()
  @IsEnum(Status, {
    message: 'Status must be either pending or completed',
  })
  readonly status: Status;
}

export class updateTaskDto extends PartialType(TaskDto) {}
