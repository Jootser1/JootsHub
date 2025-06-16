

import { IsOptional, IsString, IsArray, IsEnum } from 'class-validator';

export class UpdateMyProfileDto {
  @IsOptional()
  @IsString()
  CITY?: string;

  @IsOptional()
  @IsString()
  AGE?: string;

  @IsOptional()
  @IsString()
  GENDER?: string;

  @IsOptional()
  @IsString()
  JOB?: string;

  @IsOptional()
  @IsString()
  ORIGIN?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  PASSIONS?: string[];

  @IsOptional()
  @IsString()
  QUALITY?: string;

  @IsOptional()
  @IsString()
  FLAW?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ORIENTATION?: string[];

  @IsOptional()
  @IsString()
  BIO?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
