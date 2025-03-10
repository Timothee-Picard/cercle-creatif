import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { JwtPayload } from './jwt-payload.interface'
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from '../users/dto/create-user.dto' // Assurez-vous d'importer le DTO approprié

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
    const user = await this.usersService.findOneByEmail(createUserDto.email)
    if (user) {
      throw new ConflictException('Email already used')
    }

    const { password } = createUserDto

    const hashedPassword = await bcrypt.hash(password, 10)

    return await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    })
  }
}
