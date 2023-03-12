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
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(ADMINROLE)
  role: ADMINROLE;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export class AdminUpdateDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(ADMINROLE)
  role: ADMINROLE;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
