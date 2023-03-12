import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WeekDTO, WeekUpdateDTO } from './dto/week.dto';
import { WeekService } from './week.service';

@Controller('week')
export class WeekController {
  constructor(private readonly weekService: WeekService) {}

  @Get()
  public async allWeek() {
    return this.weekService.allWeeks();
  }

  @Get('id/:id')
  public async weekById(@Param('id') id: string) {
    return this.weekService.getWeekById(Number(id));
  }

  @Post()
  public async openWeek(@Body() body: WeekDTO) {
    return this.weekService.weekCreate(body);
  }

  @Put('id/:id')
  public async closeOpenWeek(
    @Param('id') id: string,
    @Body() body: WeekUpdateDTO,
  ) {
    return this.weekService.updateWeek(Number(id), body);
  }

  @Delete('id/:id')
  public async del(@Param('id') id) {
    return this.weekService.deleteWeek(id);
  }
}
