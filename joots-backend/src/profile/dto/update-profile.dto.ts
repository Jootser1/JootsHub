import { AttributeKey } from '@prisma/client';
import { IsOptional, IsString, IsArray, IsEnum } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  [AttributeKey.CITY]?: string;

  @IsOptional()
  @IsString()
  [AttributeKey.AGE]?: string;

  @IsOptional()
  @IsString()
  [AttributeKey.GENDER]?: string;

  @IsOptional()
  @IsString()
  [AttributeKey.JOB]?: string;

  @IsOptional()
  @IsString()
  [AttributeKey.ORIGIN]?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  [AttributeKey.PASSIONS]?: string[];

  @IsOptional()
  @IsString()
  [AttributeKey.QUALITY]?: string;

  @IsOptional()
  @IsString()
  [AttributeKey.FLAW]?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  [AttributeKey.ORIENTATION]?: string[];

  @IsOptional()
  @IsString()
  [AttributeKey.BIO]?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
