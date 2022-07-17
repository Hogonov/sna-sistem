import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MediaDocument = Media & Document;

@Schema()
export class Media {
  @ApiProperty({
    example: 'pic.twitter.com/rJC5Pxsu',
    description: 'URL of the media to display to clients.',
  })
  @Prop()
  display_url: string;

  @ApiProperty({
    example:
      'An expanded version of display_url. Links to the media display page.',
    description: 'http://twitter.com/yunorno/status/114080493036773378/photo/1',
  })
  @Prop()
  expanded_url: string;

  @ApiProperty({
    example: 114080493040967680,
    description: 'ID of the media expressed as a 64-bit integer.',
  })
  @Prop()
  id: number;

  @ApiProperty({
    example: [15, 35],
    description:
      'An array of integers indicating the offsets within the Tweet text where the URL begins and ends. The first integer represents the location of the first character of the URL in the Tweet text. The second integer represents the location of the first non-URL character occurring after the URL (or the end of the string if the URL is the last part of the Tweet text).',
  })
  @Prop()
  indices: Array<number>;

  @ApiProperty({
    example: 'http://pbs.twimg.com/media/DOhM30VVwAEpIHq.jpg',
    description: 'An http:// URL pointing directly to the uploaded media file.',
  })
  @Prop()
  media_url: string;

  @ApiProperty({
    example: {
      thumb: {
        h: 150,
        resize: 'crop',
        w: 150,
      },
      large: {
        h: 1366,
        resize: 'fit',
        w: 2048,
      },
      medium: {
        h: 800,
        resize: 'fit',
        w: 1200,
      },
      small: {
        h: 454,
        resize: 'fit',
        w: 680,
      },
    },
    description: 'An object showing available sizes for the media file.',
  })
  @Prop()
  sizes: Array<object>; // типизтировать

  @ApiProperty({
    example: 205282515685081088,
    description:
      'Nullable. For Tweets containing media that was originally associated with a different tweet, this ID points to the original Tweet.',
  })
  @Prop()
  source_status_id: number;

  @ApiProperty({
    example: 'photo',
    description:
      'Type of uploaded media. Possible types include photo, video, and animated_gif.',
  })
  @Prop()
  type: string;

  @ApiProperty({
    example: 'http://t.co/rJC5Pxsu',
    description:
      'Wrapped URL for the media link. This corresponds with the URL embedded directly into the raw Tweet text, and the values for the indices parameter.',
  })
  @Prop()
  url: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
