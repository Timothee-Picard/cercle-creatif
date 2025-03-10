import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from '../../jwt-payload.interface'
import { UsersService } from '../../../users/users.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET', 'default_secret'),
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOneByEmail(payload.email)
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé')
    }
    return user
  }
}
