import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ADMINROLE } from '../../constants/roles';

export class AdminDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsEnum(ADMINROLE)
  @ApiProperty({ enum: ADMINROLE })
  role: ADMINROLE;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}

export class AdminUpdateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  username: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsEnum(ADMINROLE)
  @ApiProperty({ enum: ADMINROLE })
  role: ADMINROLE;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}
