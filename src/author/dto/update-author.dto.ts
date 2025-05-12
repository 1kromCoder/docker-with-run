import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  year?: number;
  @ApiProperty()
  phone?: string;
}
