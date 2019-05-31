import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateItemDTO {
  @IsString()
  @ApiModelProperty({ type: String })
  readonly title: string;

  @IsString()
  @ApiModelProperty({ type: String })
  readonly content: string;
}
