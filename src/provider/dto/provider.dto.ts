import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProviderDto {
  readonly name: string;
  readonly cell: string;
}

export class ProviderDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  cell: string;
}

export class ProviderUpdateDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  cell: string;
}
