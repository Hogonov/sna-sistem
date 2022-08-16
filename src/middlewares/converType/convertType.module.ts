import { Module } from '@nestjs/common';
import { ConvertTypeService } from './convertType.service';

@Module({
  providers: [ConvertTypeService],
})
export class ConvertTypeModule {}
