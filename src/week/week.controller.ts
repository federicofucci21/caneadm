import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WeekDTO, WeekUpdateDTO } from './dto/week.dto';
import { WeekService } from './week.service';

@ApiTags('Weeks')
@Controller('week')
export class WeekController {
  constructor(private readonly weekService: WeekService) {}

  @Get()
  public async allWeek() {
    return await this.weekService.allWeeks();
  }

  @Get('id/:id')
  public async weekById(@Param('id') id: string) {
    return await this.weekService.getWeekById(Number(id));
  }

  @Post()
  public async openWeek(@Body() body: WeekDTO) {
    return await this.weekService.weekCreate(body);
  }

  @Put('id/:id')
  public async editOpenWeek(
    @Param('id') id: string,
    @Body() body: WeekUpdateDTO,
  ) {
    return await this.weekService.updateWeek(Number(id), body);
  }

  @Put('id/:id/close')
  public async closeOpenWeek(@Param('id') id: string) {
    return await this.weekService.closeWeek(Number(id));
  }

  @Delete('id/:id')
  public async del(@Param('id') id) {
    return await this.weekService.deleteWeek(id);
  }
}
