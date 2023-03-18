import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { USERSROLE } from '../../constants/roles';

export class UserDTO {
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
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  cell: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @IsOptional()
  @IsEnum(USERSROLE)
  @ApiProperty({ enum: USERSROLE })
  role: USERSROLE;
}

export class UserUpdateDTO {
  @IsOptional()
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
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  cell: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @IsOptional()
  @IsEnum(USERSROLE)
  @ApiProperty({ enum: USERSROLE })
  role: USERSROLE;
}
