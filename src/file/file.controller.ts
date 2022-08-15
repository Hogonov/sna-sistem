import { FileService, FileType } from './file.service';
import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Файлы')
@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @ApiOperation({ summary: 'Получение файла по названию' })
  @ApiResponse({ status: 200, type: Object })
  @Get('/:type/:filename')
  async getFile(
    @Param('type') type: string,
    @Param('filename') filename: string,
  ) {
    return this.fileService.getFile(type, filename);
  }

  @ApiOperation({ summary: 'Добавление 1 изображения в БД' })
  @ApiResponse({ status: 200, type: String })
  @Post('/image')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image' }]))
  async addImage(@UploadedFiles() file) {
    const { image } = file;
    return this.fileService.createFile(FileType.IMAGE, image[0]);
  }
}
