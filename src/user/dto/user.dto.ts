import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly cell: string;
  readonly address: string;
  readonly isActive: boolean;
}

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  cell: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  cell: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
