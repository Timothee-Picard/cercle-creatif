import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string

  @IsString()
  @IsNotEmpty()
  last_name: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string
}
