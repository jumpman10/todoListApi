import { IsNotEmpty, IsEnum, MinLength } from 'class-validator';

enum Status {
    PENDING = 'pending',
    COMPLETED = 'completed',
}

export class TaskDto {
    @IsNotEmpty()
    @MinLength(4)
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