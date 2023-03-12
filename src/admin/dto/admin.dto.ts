import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AdminRole } from '../entities/admin.entity';

export class AdminDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly role: AdminRole;
  readonly isActive: boolean;
}

export class AdminDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  role: AdminRole;

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
  role: AdminRole;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
