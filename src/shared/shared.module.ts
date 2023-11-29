import { Module } from '@nestjs/common';
import { CommonGetIdDto } from './dto/common-get-id.dto';

@Module({
    exports:[CommonGetIdDto]
})
export class SharedModule {}
