import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from '../../users/entities/user.entity'

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'enum', enum: ['Artist', 'Company'] })
  type: 'Artist' | 'Company'

  // Artist
  @Column({ nullable: true })
  bio: string

  @Column({ nullable: true })
  portfolio_url: string

  // Company
  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  website: string

  @Column({ nullable: true })
  industry: string

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  user: User
}
