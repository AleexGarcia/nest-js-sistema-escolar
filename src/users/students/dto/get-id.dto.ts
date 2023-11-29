import { IsNotEmpty, IsUUID } from "class-validator";

export class getIdDTO {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}