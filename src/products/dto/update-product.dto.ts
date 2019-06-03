import { IsString } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDTO {
  @IsString()
  @ApiModelPropertyOptional({ type: String })
  readonly title: string;

  @IsString()
  @ApiModelPropertyOptional({ type: String })
  readonly content: string;
}
