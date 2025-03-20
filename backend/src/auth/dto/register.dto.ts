import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator'

export class RegisterDto {
  @ApiProperty({
    description: "Le prénom de l'utilisateur",
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string

  @ApiProperty({
    description: "Le nom de famille de l'utilisateur",
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string

  @ApiProperty({
    description: "Le nom d'utilisateur (username) unique",
    example: 'johndoe123',
  })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    description: "L'email de l'utilisateur",
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    description: "Le mot de passe de l'utilisateur",
    example: 'password123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string
}
