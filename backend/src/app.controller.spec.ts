import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { HealthController } from './health.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let healthController: HealthController
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController, HealthController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
    healthController = app.get<HealthController>(HealthController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!')
    })
  })

  describe('health', () => {
    it('should return "I am healthy"', () => {
      expect(healthController.checkHealth()).toBe('Service is healthy')
    })
  })
})
