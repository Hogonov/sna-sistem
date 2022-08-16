import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { createReadStream } from 'fs';

export enum FileType {
  IMAGE = 'image',
  CSV = 'csv',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      // console.log(filePath, !fs.existsSync(filePath));
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(file: string) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static', file);
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (e) => {
          if (e) {
            console.log(e);
          } else {
            console.log('Файл удалён');
          }
        });
      } else {
        console.log('нет файла', filePath);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFileHelper(removeFiles: string[] | string) {
    try {
      const removedFile = removeFiles ? [].concat(removeFiles) : [];
      removedFile && removedFile.map((element) => this.removeFile(element));
      console.log('Файлы успешно удаленны');
      return removedFile;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getFile(type: string, filename: string) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static', type, filename);
      if (fs.existsSync(filePath)) {
        const file = createReadStream(filePath);
        return new StreamableFile(file);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getFileForParseDB(fileDirectoryPath: Array<string>, filename: string) {
    try {
      const filePath = path.resolve(__dirname, ...fileDirectoryPath, filename);
      if (fs.existsSync(filePath)) {
        const file = fs
          .readFileSync(filePath, 'utf8')
          .replace(/\n*\/\/[\w\s.]+\n/g, '');

        return file;
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
