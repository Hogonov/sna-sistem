import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TweetDocument = Tweet & Document;

@Schema()
export class Tweet {
  @ApiProperty({
    example: 1050118621198921728,
    description:
      'The integer representation of the unique identifier for this Tweet. This number is greater than 53 bits and some programming languages may have difficulty/silent defects in interpreting it. Using a signed 64 bit integer for storing this identifier is safe. Use id_str to fetch the identifier to be safe. See Twitter IDs for more information.',
  })
  @Prop()
  tweet_id: number;

  @ApiProperty({
    example: 'Wed Oct 10 20:19:24 +0000 2018',
    description: 'UTC time when this Tweet was created.',
  })
  @Prop()
  created_at: Date;

  @ApiProperty({
    example:
      'To make room for more expression, we will now count all emojis as equal—including those with gender‍‍‍ ‍‍and skin t… https://t.co/MkGjXf9aXm',
    description:
      'The actual UTF-8 text of the status update. See twitter-text for details on what characters are currently considered valid. ',
  })
  @Prop()
  full_text: string;

  @ApiProperty({
    example: {
      hashtags: [],
      urls: [],
      user_mentions: [],
      media: [],
      symbols: [],
      polls: [],
    },
    description:
      'Entities which have been parsed out of the text of the Tweet.',
  })
  @Prop()
  entities: number; //  Object

  @ApiProperty({
    example: 'Twitter Web Client',
    description:
      'Utility used to post the Tweet, as an HTML-formatted string. Tweets from the Twitter website have a source value of web.',
  })
  @Prop()
  source: string;

  @ApiProperty({
    example: 1051222721923756032,
    description:
      ' If the represented Tweet is a reply, this field will contain the integer representation of the original Tweet’s ID.',
  })
  @Prop()
  in_reply_to_status_id: number;

  @ApiProperty({
    example: 6253282,
    description:
      ' If the represented Tweet is a reply, this field will contain the integer representation of the original Tweet’s author ID. This will not necessarily always be the user directly mentioned in the Tweet.',
  })
  @Prop()
  in_reply_to_user_id: number;

  @ApiProperty({
    example: 'twitterapi',
    description:
      'If the represented Tweet is a reply, this field will contain the screen name of the original Tweet’s author.',
  })
  @Prop()
  in_reply_to_screen_name: string;

  @ApiProperty({
    example: 6253282,
    description: 'The user who posted this Tweet.',
  })
  @Prop()
  user_id: number; // ссылка на таблицу с пользователями

  @ApiProperty({
    example: {
      coordinates: [-75.14310264, 40.05701649],
      type: 'Point',
    },
    description:
      'Represents the geographic location of this Tweet as reported by the user or client application. The inner coordinates array is formatted as geoJSON (longitude first, then latitude).',
  })
  @Prop()
  coordinates: string;

  @ApiProperty({
    example: {
      attributes: {},
      bounding_box: {
        coordinates: [
          [
            [-77.119759, 38.791645],
            [-76.909393, 38.791645],
            [-76.909393, 38.995548],
            [-77.119759, 38.995548],
          ],
        ],
        type: 'Polygon',
      },
      country: 'United States',
      country_code: 'US',
      full_name: 'Washington, DC',
      id: '01fbe706f872cb32',
      name: 'Washington',
      place_type: 'city',
      url: 'http://api.twitter.com/1/geo/id/0172cb32.json',
    },
    description:
      'Nullable When present, indicates that the tweet is associated (but not necessarily originating from) a Place .',
  })
  @Prop()
  place: string; // Object

  @ApiProperty({
    example: true,
    description: 'Indicates whether this is a Quoted Tweet.',
  })
  @Prop()
  is_quote_status: boolean;

  @ApiProperty({
    example: 160,
    description: 'Number of times this Tweet has been retweeted.',
  })
  @Prop()
  retweet_count: number;

  @ApiProperty({
    example: 293,
    description:
      'Indicates approximately how many times this Tweet has been liked by Twitter users. ',
  })
  @Prop()
  favorite_count: number;

  @ApiProperty({
    example: 12,
    description: 'Number of times this Tweet has been replied to.',
  })
  @Prop()
  reply_count: number;

  @ApiProperty({
    example: 1,
    description:
      'Indicates approximately how many times this Tweet has been quoted by Twitter users.',
  })
  @Prop()
  quote_count: number;

  @ApiProperty({
    example: null,
    description:
      'Indicates whether this Tweet has been liked by the authenticating user.',
  })
  @Prop()
  favorited: boolean;

  @ApiProperty({
    example: false,
    description:
      'Indicates whether this Tweet has been Retweeted by the authenticating user.',
  })
  @Prop()
  retweeted: boolean;

  @ApiProperty({
    example: 'en',
    description:
      'When present, indicates a BCP 47 language identifier corresponding to the machine-detected language of the Tweet text, or und if no language could be detected.',
  })
  @Prop()
  lang: string;

  /*  @ApiProperty({
    example: 0,
    description: '',
  })
  @Prop()
  example: string;*/
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);
