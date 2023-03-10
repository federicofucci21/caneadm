import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common/decorators';
import { ProviderDTO } from './dto/provider.dto';
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

  @Post()
  public async createUser(@Body() body: ProviderDTO) {
    return await this.providerService.createProvider(body);
  }
}
