import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { Request as ExpressRequest } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'User login to obtain a JWT' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: String,
  })
  @ApiResponse({ status: 401, description: 'Incorrect credentials' })
  @ApiBody({ type: LoginDto })
  async login(@Request() req: ExpressRequest) {
    return this.authService.login(req.user)
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: RegisterDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  @ApiOperation({ summary: "Get the user's profile information" })
  @ApiResponse({
    status: 200,
    description: "Returns the logged-in user's information",
  })
  @ApiResponse({ status: 401, description: 'User not logged in' })
  @ApiBearerAuth()
  getProfile(@Request() req: ExpressRequest) {
    return req.user
  }
}
