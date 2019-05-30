import { IsString, Length, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserCredentialsDTO {
  @IsEmail()
  @ApiModelProperty({
    type: String,
    required: true,
  })
  readonly email: string;

  @IsString()
  @Length(6, 30)
  @ApiModelProperty({
    type: String,
    required: true,
  })
  readonly password: string;
}
