import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Account } from './entities/account.entity'
import { Repository } from 'typeorm'
import { User } from '../users/entities/user.entity'
import { CreateAccountDto } from './dto/create-account.dto'

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAllByUserId(userId: number): Promise<Account[]> {
    return this.accountsRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    })
  }

  async create(
    newAccount: CreateAccountDto & { userId: number },
  ): Promise<Account> {
    const existingUser = await this.usersRepository.findOne({
      where: { id: newAccount.userId },
    })
    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    if (newAccount.type !== 'Artist' && newAccount.type !== 'Company') {
      throw new HttpException('Invalid account type', HttpStatus.BAD_REQUEST)
    }

    const account = this.accountsRepository.create({
      type: newAccount.type,
      user: existingUser,
      bio: newAccount.bio,
      portfolio_url: newAccount.portfolio_url,
      address: newAccount.address,
      website: newAccount.website,
      industry: newAccount.industry,
    })
    return this.accountsRepository.save(account)
  }
}
