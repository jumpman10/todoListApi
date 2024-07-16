import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('items') //TODO Cunado visitas http://localhost:3000/items
  getItems(): string {
    return this.appService.getItems();
  }
}
