import { Body, Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { AccountsService } from './accounts.service'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'
import { CreateAccountDto } from './dto/create-account.dto'
import { Account } from './entities/account.entity'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Request as ExpressRequest } from 'express'

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiOperation({ summary: 'Get all accounts for the current user' })
  @ApiResponse({
    status: 200,
    description: 'List of accounts for the current user',
    type: [Account],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAllByCurrentUser(@Request() req: any) {
    const userId = req.user.id
    return this.accountsService.findAllByUserId(userId)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  @ApiBody({ type: CreateAccountDto })
  @ApiResponse({
    status: 201,
    description: 'Account successfully created',
    type: Account,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createByCurrentUser(
    @Body() createAccountDto: CreateAccountDto,
    @Request() req: any,
  ): Promise<Account> {
    const userId = req.user.id

    const newAccount = {
      ...createAccountDto,
      userId: userId,
    }
    return this.accountsService.create(newAccount)
  }
}
