import { Module } from '@nestjs/common';
import { ConvertTypeModule } from './converType/convertType.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [ConvertTypeModule],
})
export class MiddlewareModule {}
