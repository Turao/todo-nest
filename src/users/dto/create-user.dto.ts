import { IsString, Length, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsEmail()
  @ApiModelProperty({ type: String })
  readonly email: string;

  @IsString()
  @Length(6, 30)
  @ApiModelProperty({
    type: String,
    minLength: 6,
    maxLength: 30,
  })
  readonly password: string;

  @IsString()
  @Length(6, 30)
  @ApiModelProperty({
    type: String,
    minLength: 6,
    maxLength: 30,
  })
  readonly username: string;
}
