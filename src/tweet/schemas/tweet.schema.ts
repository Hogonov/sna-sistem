import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Entity } from '../../entity/schemas/entity.schema';
import { Place } from '../../place/schemas/place.schema';
import { User } from '../../user/schemas/user.schema';

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
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Entity' } })
  entities: Entity;

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
    type: () => User,
  })
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  user_id: User;

  @ApiProperty({
    example: {
      coordinates: [-75.14310264, 40.05701649],
      type: 'Point',
    },
    description:
      'Represents the geographic location of this Tweet as reported by the user or client application. The inner coordinates array is formatted as geoJSON (longitude first, then latitude).',
  })
  @Prop({ type: Object })
  coordinates: object;

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
    type: () => Place,
  })
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' } })
  place: Place;

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

  @ApiProperty({
    example: {
      id: 6253282,
      id_str: '6253282',
    },
    description:
      'Perspectival Only surfaces on methods supporting the include_my_retweet parameter, when set to true. Details the Tweet ID of the user’s own retweet (if existent) of this Tweet.',
  })
  @Prop({ type: Object })
  current_user_retweet: object;

  @ApiProperty({
    example: { followers: false },
    description:
      'A set of key-value pairs indicating the intended contextual delivery of the containing Tweet. Currently used by Twitter’s Promoted Products.',
  })
  @Prop({ type: Object })
  scopes: object;

  @ApiProperty({
    example: true,
    description:
      'When present and set to “true”, it indicates that this piece of content has been withheld due to a DMCA complaint .',
  })
  @Prop()
  withheld_copyright: boolean;

  @ApiProperty({
    example: ['GR', 'HK', 'MY'],
    description:
      'When present, indicates a list of uppercase two-letter country codes this content is withheld from. Twitter supports the following non-country values for this field:\n' +
      '\n' +
      '“XX” - Content is withheld in all countries “XY” - Content is withheld due to a DMCA request.',
  })
  @Prop()
  withheld_in_countries: Array<string>;

  @ApiProperty({
    example: 'status',
    description:
      'When present, indicates whether the content being withheld is the “status” or a “user.”',
  })
  @Prop()
  withheld_scope: string;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);
