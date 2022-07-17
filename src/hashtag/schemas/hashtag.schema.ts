import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type EntityDocument = Hashtag & Document;

@Schema()
export class Hashtag {
  @ApiProperty({
    example: [32, 38],
    description:
      'An array of integers indicating the offsets within the Tweet text where the hashtag begins and ends. The first integer represents the location of the # character in the Tweet text string. The second integer represents the location of the first character after the hashtag. Therefore the difference between the two numbers will be the length of the hashtag name plus one (for the ‘#’ character).',
  })
  @Prop()
  indices: Array<number>;

  @ApiProperty({
    example: 'nodejs',
    description: 'Name of the hashtag, minus the leading ‘#’ character.',
  })
  @Prop()
  text: string;
}

export const HashtagSchema = SchemaFactory.createForClass(Hashtag);
