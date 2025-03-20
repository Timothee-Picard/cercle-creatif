import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { JwtPayload } from './jwt-payload.interface'
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      return user
    }
    throw new UnauthorizedException('Invalid credentials')
  }

  async login(user: any) {
    const payload: JwtPayload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(
      createUserDto.email,
    )
    if (existingUser) {
      throw new ConflictException('Email already used')
    }

    const existingUsername = await this.usersService.findOneByUsername(
      createUserDto.username,
    )
    if (existingUsername) {
      throw new ConflictException('Username already taken')
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    })
  }
}
