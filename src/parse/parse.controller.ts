import { Body, Controller, Get, UseInterceptors } from '@nestjs/common';
import { ParseService } from './parse.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Парсер данных')
@Controller('parse')
export class ParseController {
  constructor(private readonly parseService: ParseService) {}

  @ApiOperation({ summary: 'Парсер дампа бд для таблице user' })
  @ApiResponse({ status: 200, description: '' })
  @Get('/user')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'dumpDB' }]))
  /** path = ../../JSONs
   * name = export0.json
   * */
  createUser(@Body() dto: { path: string; name: string }) {
    const { path, name } = dto;
    console.log(dto);
    return this.parseService.createUser(path, name);
  }

  @ApiOperation({ summary: 'Парсер дампа бд для таблице tweet' })
  @ApiResponse({ status: 200, description: '' })
  @Get('/tweet')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'dumpDB' }]))
  /** path = ../../JSONs
   * name = export0.json
   * */
  createTweet(@Body() dto: { path: string; name: string }) {
    const { path, name } = dto;
    console.log(dto);
    return this.parseService.createTweet(path, name);
  }
}
