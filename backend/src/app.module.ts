import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      authSource: 'admin',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // TODO: Remove synchronize in production
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
