import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Hashtag } from '../../hashtag/schemas/hashtag.schema';
import * as mongoose from 'mongoose';
import { Media } from '../../media/schemas/media.schema';
import { Url } from '../../url/schemas/url.schema';

export type UserMentionDocument = UserMention & Document;

@Schema()
export class UserMention {
  @ApiProperty({
    example: 6253282,
    description: 'ID of the mentioned user, as an integer.',
  })
  @Prop()
  id: number;

  @ApiProperty({
    example: [4, 15],
    description:
      'An array of integers representing the offsets within the Tweet text where the user reference begins and ends. The first integer represents the location of the ‘@’ character of the user mention. The second integer represents the location of the first non-screenname character following the user mention. ',
  })
  @Prop()
  indices: Array<number>;

  @ApiProperty({
    example: 'Twitter API',
    description: 'Display name of the referenced user.',
  })
  @Prop()
  name: string;

  @ApiProperty({
    example: 'twitterapi',
    description: 'Screen name of the referenced user.',
  })
  @Prop()
  screen_name: string;
}

export const UserMentionSchema = SchemaFactory.createForClass(UserMention);
