import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post, Put, Query } from '@nestjs/common/decorators';
import { ProviderDTO, ProviderUpdateDTO } from './dto/provider.dto';
import { ProviderService } from './provider.service';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  public async getAllProviders() {
    return await this.providerService.findProviders();
  }

  @Get('id/:id')
  public async getProviderById(@Param('id') id: string) {
    return await this.providerService.getById(Number(id));
  }

  @Get('name')
  public async getProviderByVame(@Query('name') name: string) {
    return await this.providerService.findOneByName(name);
  }

  @Post()
  public async createUser(@Body() body: ProviderDTO) {
    return await this.providerService.createProvider(body);
  }

  @Put('id/:id')
  public async editProvider(
    @Param('id') id: string,
    @Body() body: ProviderUpdateDTO,
  ) {
    return await this.providerService.updateProvider(Number(id), body);
  }
}
