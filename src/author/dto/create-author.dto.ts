import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  phone: string;
}
