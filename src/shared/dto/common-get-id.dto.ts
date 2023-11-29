import { IsNotEmpty, IsUUID } from 'class-validator';

export class CommonGetIdDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
