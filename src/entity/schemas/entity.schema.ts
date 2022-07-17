import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Hashtag } from '../../hashtag/schemas/hashtag.schema';
import * as mongoose from 'mongoose';
import { Media } from '../../media/schemas/media.schema';
import { Url } from '../../url/schemas/url.schema';
import { UserMention } from './user-mention.schema';

export type EntityDocument = Entity & Document;

@Schema()
export class Entity {
  @ApiProperty({
    example: [
      {
        indices: [32, 38],
        text: 'nodejs',
      },
    ],
    description:
      'Represents hashtags which have been parsed out of the Tweet text.',
    type: () => Hashtag,
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hashtag' }] })
  hashtags: Hashtag[];

  @ApiProperty({
    description: 'Represents media elements uploaded with the Tweet.',
    type: () => [Media],
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }] })
  media: Media[];

  @ApiProperty({
    examples: [
      [
        {
          indices: [32, 52],
          url: 'http://t.co/IOwBrTZR',
          display_url: 'youtube.com/watch?v=oHg5SJ…',
          expanded_url: 'http://www.youtube.com/watch?v=oHg5SJYRHA0',
        },
      ],
      [
        {
          url: 'https://t.co/D0n7a53c2l',
          expanded_url: 'http://bit.ly/18gECvy',
          display_url: 'bit.ly/18gECvy',
          unwound: {
            url: 'https://www.youtube.com/watch?v=oHg5SJYRHA0',
            status: 200,
            title: "RickRoll'D",
            description:
              'http://www.facebook.com/rickroll548 As long as trolls are still trolling, the Rick will never stop rolling.',
          },
          indices: [62, 85],
        },
      ],
    ],
    description: 'Represents URLs included in the text of a Tweet.',
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Url' }] })
  urls: Url[];

  @ApiProperty({
    example: [
      {
        name: 'Twitter API',
        indices: [4, 15],
        screen_name: 'twitterapi',
        id: 6253282,
      },
    ],
    description:
      'Represents other Twitter users mentioned in the text of the Tweet',
    type: () => [UserMention],
  })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserMention' }],
  })
  user_mentions: UserMention[];

  @ApiProperty({
    example: [
      {
        indices: [12, 17],
        text: 'twtr',
      },
    ],
    description:
      'Represents symbols, i.e. $cashtags, included in the text of the Tweet.',
  })
  @Prop()
  symbols: Array<object>; // типизировать

  @ApiProperty({
    example: [
      {
        options: [
          {
            position: 1,
            text: 'I read documentation once.',
          },
          {
            position: 2,
            text: 'I read documentation twice.',
          },
          {
            position: 3,
            text: 'I read documentation over and over again.',
          },
        ],
        end_datetime: 'Thu May 25 22:20:27 +0000 2017',
        duration_minutes: 60,
      },
    ],
    description: 'Represents Twitter Polls included in the Tweet. ',
  })
  @Prop()
  polls: Array<object>; // типизировать;
}

export const EntitySchema = SchemaFactory.createForClass(Entity);
