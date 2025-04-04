import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountDto {
  @ApiProperty({
    description: 'The type of the account (e.g., Artist or Company)',
    example: 'Artist', // or 'Company'
  })
  type: 'Artist' | 'Company'

  /*  @ApiProperty({
    description: 'User ID associated with this account',
    example: 1,
  })
  userId: number;*/

  // Artist properties
  @ApiProperty({
    description: 'Biography of the artist',
    example: 'I am a passionate artist with a love for painting.',
    required: false,
  })
  bio?: string

  @ApiProperty({
    description: 'Portfolio URL of the artist',
    example: 'https://myportfolio.com',
    required: false,
  })
  portfolio_url?: string

  // Company properties
  @ApiProperty({
    description: 'Company address',
    example: '123 Company St, Business City, BC',
    required: false,
  })
  address?: string

  @ApiProperty({
    description: 'Company website',
    example: 'https://mycompany.com',
    required: false,
  })
  website?: string

  @ApiProperty({
    description: 'Industry the company is involved in',
    example: 'Technology',
    required: false,
  })
  industry?: string
}
