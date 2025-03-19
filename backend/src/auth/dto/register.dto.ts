import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class RegisterDto {
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
