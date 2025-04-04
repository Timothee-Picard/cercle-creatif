import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Account } from '../../accounts/entities/account.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[]
}
