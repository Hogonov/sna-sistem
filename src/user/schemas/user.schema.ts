import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Entity } from '../../entity/schemas/entity.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User {
  @ApiProperty({
    example: 'Twitter API',
    description:
      'The name of the user, as they’ve defined it. Not necessarily a person’s name. Typically capped at 50 characters, but subject to change.',
  })
  @Prop()
  name: string;

  @ApiProperty({
    example: 'twitterapi',
    description:
      'The screen name, handle, or alias that this user identifies themselves with. screen_names are unique but subject to change. Use id_str as a user identifier whenever possible. Typically a maximum of 15 characters long, but some historical accounts may exist with longer names.',
  })
  @Prop()
  screen_name: string;

  @ApiProperty({
    example: 'San Francisco, CA',
    description:
      'he user-defined location for this account’s profile. Not necessarily a location, nor machine-parseable. This field will occasionally be fuzzily interpreted by the Search service.',
  })
  @Prop()
  location: string;

  @ApiProperty({
    example: {
      locations: [
        { country: 'United States', country_code: 'US', locality: 'Denver' },
      ],
    },
    description:
      'Enterprise APIs only Collection of Enrichment metadata derived for user. Provides the Profile Geo Enrichment metadata. See referenced documentation for more information, including JSON data dictionaries. ',
  })
  @Prop()
  derived: Array<object>;

  @ApiProperty({
    example: 'https://developer.twitter.com',
    description:
      ' A URL provided by the user in association with their profile. ',
  })
  @Prop()
  url: string;

  @ApiProperty({
    example: 'The Real Twitter API.',
    description: 'The user-defined UTF-8 string describing their account.',
  })
  @Prop()
  description: string;

  @ApiProperty({
    example: true,
    description:
      'When true, indicates that this user has chosen to protect their Tweets.',
  })
  @Prop()
  protected: boolean;

  @ApiProperty({
    example: false,
    description: 'When true, indicates that the user has a verified account.',
  })
  @Prop()
  verified: boolean;

  @ApiProperty({
    example: 21,
    description:
      'The number of followers this account currently has. Under certain conditions of duress, this field will temporarily indicate “0”.',
  })
  @Prop()
  followers_count: number;

  @ApiProperty({
    example: 32,
    description:
      'The number of users this account is following (AKA their “followings”). Under certain conditions of duress, this field will temporarily indicate “0”. ',
  })
  @Prop()
  friends_count: number;

  @ApiProperty({
    example: 9274,
    description: 'The number of public lists that this user is a member of.',
  })
  @Prop()
  listed_count: number;

  @ApiProperty({
    example: 13,
    description:
      'The number of Tweets this user has liked in the account’s lifetime. British spelling used in the field name for historical reasons.',
  })
  @Prop()
  favourites_count: string;

  @ApiProperty({
    example: 42,
    description:
      'The number of Tweets (including retweets) issued by the user. ',
  })
  @Prop()
  statuses_count: number;

  @ApiProperty({
    example: 'Mon Nov 29 21:18:15 +0000 2010',
    description:
      'The UTC datetime that the user account was created on Twitter.',
  })
  @Prop()
  created_at: string;

  @ApiProperty({
    example: 'https://si0.twimg.com/profile_banners/819797/1348102824',
    description:
      'The HTTPS-based URL pointing to the standard web representation of the user’s uploaded profile banner. By adding a final path element of the URL, it is possible to obtain different image sizes optimized for specific displays. For size variants, please see User Profile Images and Banners .',
  })
  @Prop()
  profile_banner_url: string;

  @ApiProperty({
    example:
      'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
    description: 'A HTTPS-based URL pointing to the user’s profile image.',
  })
  @Prop()
  profile_image_url_https: string;

  @ApiProperty({
    example: false,
    description:
      'When true, indicates that the user has not altered the theme or background of their user profile.',
  })
  @Prop()
  default_profile: boolean;

  @ApiProperty({
    example: false,
    description:
      'When true, indicates that the user has not uploaded their own profile image and a default image is used instead.',
  })
  @Prop()
  default_profile_image: boolean;

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
    example: 'user',
    description:
      'When present, indicates that the content being withheld is a “user.”',
  })
  @Prop()
  withheld_scope: string;
}

export type UserDocument = Entity & Document;

export const UserSchema = SchemaFactory.createForClass(User);
