import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Place {
  @ApiProperty({
    example: '01a9a39529b27f36',
    description:
      'ID representing this place. Note that this is represented as a string, not an integer.',
  })
  @Prop()
  id: string;

  @ApiProperty({
    example: 'https://api.twitter.com/1.1/geo/id/01a9a39529b27f36.json',
    description:
      'URL representing the location of additional place metadata for this place.',
  })
  @Prop()
  url: string;

  @ApiProperty({
    example: 'city',
    description: 'The type of location represented by this place. ',
  })
  @Prop()
  place_type: string;

  @ApiProperty({
    example: 'Manhattan',
    description: 'Short human-readable representation of the place’s name. ',
  })
  @Prop()
  name: string;

  @ApiProperty({
    example: 'Manhattan, NY',
    description: 'Full human-readable representation of the place’s name.',
  })
  @Prop()
  full_name: string;

  @ApiProperty({
    example: 'US',
    description:
      'Shortened country code representing the country containing this place.',
  })
  @Prop()
  country_code: string;

  @ApiProperty({
    example: 'United States',
    description: 'Name of the country containing this place.',
  })
  @Prop()
  country: string;

  @ApiProperty({
    example: {
      coordinates: [
        [
          [-74.026675, 40.683935],
          [-74.026675, 40.877483],
          [-73.910408, 40.877483],
          [-73.910408, 40.3935],
        ],
      ],
      type: 'Polygon',
    },
    description: 'A bounding box of coordinates which encloses this place.',
  })
  @Prop({ type: Object })
  bounding_box: object;

  @ApiProperty({
    example: {},
    description:
      'When using PowerTrack, 30-Day and Full-Archive Search APIs, and Volume Streams this hash is null.',
  })
  @Prop({ type: Object })
  attributes: object;
}
export type PlaceDocument = Place & Document;

export const PlaceSchema = SchemaFactory.createForClass(Place);
