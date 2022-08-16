import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

type ConvertFieldType = {
  field: string;
  originType: string;
  toType: string;
};
export enum ConvertType {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
  BOOLEAN = 'boolean',
  NONE = 'none',
}

@Injectable()
export class ConvertTypeService {
  convertStringToKeyWord(str: string | number): any {
    switch (str) {
      case 'undefined':
        return undefined;
      case 'null':
        return null;
      default:
        return str;
    }
  }

  async replaceFieldsJSON(
    file: string,
    oldFields: Array<string> = [],
    newFields: Array<string> = [],
    convertFields: Array<ConvertFieldType> = [],
  ) {
    try {
      if (oldFields.length !== newFields.length) {
        throw new Error('The size of oldFields and newFields is not the same ');
      }

      const replaced: Array<object> = JSON.parse(
        file.replace(/_([A-Za-z/d])/g, (match, p1) => p1.toUpperCase()),
      );

      for (let object of replaced) {
        await this.replacedKeys(object, oldFields, newFields);
        if (convertFields) object = this.convertingField(object, convertFields);
      }

      return replaced;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async convertingField(object, convertField: Array<ConvertFieldType>) {
    for (let i = 0; i < convertField.length; i++) {
      switch (convertField[i].originType) {
        case ConvertType.STRING:
          switch (convertField[i].toType) {
            case ConvertType.NUMBER:
              object[convertField[i].field] = +object[convertField[i].field];
              break;
            case ConvertType.DATE:
              if (object[convertField[i].field] !== null) {
                object[convertField[i].field] =
                  object[convertField[i].field] === '0000-00-00 00:00:00'
                    ? new Date()
                    : new Date(object[convertField[i].field]);
              } else {
                object[convertField[i].field] = new Date();
              }
              break;
            case ConvertType.BOOLEAN:
              let bool = false;
              if (object[convertField[i].field].toLowerCase() === 'true') {
                bool = true;
              }
              object[convertField[i].field] = bool;
              break;
          }
          break;
        case ConvertType.NUMBER:
          switch (convertField[i].toType) {
            case ConvertType.STRING:
              object[convertField[i].field] =
                '' + object[convertField[i].field];
              break;
            case ConvertType.DATE:
              if (object[convertField[i].field] !== null) {
                object[convertField[i].field] = new Date(
                  +object[convertField[i].field],
                );
              } else {
                object[convertField[i].field] = new Date();
              }
              break;
          }
          break;
        case ConvertType.NONE:
          object[convertField[i].field] = null;
          break;
      }
    }
    return object;
  }

  async replacedKeys(object, oldFields, newFields) {
    for (let i = 0; i < oldFields.length; i++) {
      if (oldFields[i] !== newFields[i]) {
        Object.defineProperty(
          object,
          newFields[i],
          Object.getOwnPropertyDescriptor(object, oldFields[i]),
        );
        delete object[oldFields[i]];
      }
    }
    return object;
  }

  async renameKeys(
    obj: object,
    oldFields: Array<string> = [],
    newFields: Array<string> = [],
    convertFields: Array<ConvertFieldType> = [],
  ) {
    let replaced = obj;
    await this.replacedKeys(obj, oldFields, newFields);
    if (convertFields) replaced = this.convertingField(replaced, convertFields);
    return replaced;
  }
}
