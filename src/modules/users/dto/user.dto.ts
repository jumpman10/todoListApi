import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
enum Type {
  ADMIN = 'admin',
  REGULAR = 'regular',
}

export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Type, {
    message: 'type must be either admin or regular',
  })
  readonly type: Type;
}
export class updateUserDto extends PartialType(UserDto) {}
