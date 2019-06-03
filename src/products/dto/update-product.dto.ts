import { IsString } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from '../../users/user.entity';

export class UpdateProductDTO {
  @IsString()
  @ApiModelPropertyOptional({ type: String })
  readonly title: string;

  @IsString()
  @ApiModelPropertyOptional({ type: String })
  readonly description: string;

  readonly owner: UserEntity;
}
