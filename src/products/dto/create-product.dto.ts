import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @IsString()
  @ApiModelProperty({ type: String })
  readonly title: string;

  @IsString()
  @ApiModelProperty({ type: String })
  readonly content: string;
}
