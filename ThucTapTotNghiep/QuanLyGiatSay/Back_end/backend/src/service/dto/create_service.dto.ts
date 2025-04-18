import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string; 

  @IsNumber()
  price: number; 

  @IsOptional()
  @IsString()
  description?: string;
}