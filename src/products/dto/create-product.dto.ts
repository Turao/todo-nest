import { IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/user.entity';

export class CreateProductDTO {
  @IsString()
  @ApiModelProperty({ type: String })
  readonly title: string;

  @IsString()
  @ApiModelProperty({ type: String })
  readonly description: string;

  readonly owner: UserEntity;
}
