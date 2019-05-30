import { IsString, Length, IsEmail, IsOptional } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  @ApiModelPropertyOptional({ type: String })
  readonly email: string;

  @IsString()
  @IsOptional()
  @Length(6, 30)
  @ApiModelPropertyOptional({
    type: String,
    minLength: 6,
    maxLength: 30,
  })
  readonly password: string;

  @IsString()
  @IsOptional()
  @Length(6, 30)
  @ApiModelPropertyOptional({
    type: String,
    minLength: 6,
    maxLength: 30,
  })
  readonly username: string;
}
