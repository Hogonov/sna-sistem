import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Url {
  @ApiProperty({
    example: 'bit.ly/2so49n2',
    description: 'URL pasted/typed into Tweet.',
  })
  @Prop()
  display_url: string;

  @ApiProperty({
    example: 'http://bit.ly/2so49n2',
    description: 'Expanded version of display_url',
  })
  @Prop()
  expanded_url: string;

  @ApiProperty({
    example: [30, 53],
    description:
      'An array of integers representing offsets within the Tweet text where the URL begins and ends. The first integer represents the location of the first character of the URL in the Tweet text. The second integer represents the location of the first non-URL character after the end of the URL.',
  })
  @Prop()
  indices: Array<number>;

  @ApiProperty({
    example: 'https://t.co/yzocNFvJuL',
    description:
      'Wrapped URL, corresponding to the value embedded directly into the raw Tweet text, and the values for the indices parameter. ',
  })
  @Prop()
  url: string;

  @ApiProperty({
    example: 200,
    description:
      "Final HTTP status of the unwinding process, a '200' indicating success.",
  })
  @Prop()
  status: number;

  @ApiProperty({
    example:
      'Using Twitter as a ‘go-to’ communication channel during severe weather',
    description: 'HTML title for the link. ',
  })
  @Prop()
  title: string;

  @ApiProperty({
    example:
      'Using Twitter as a ‘go-to’ communication channel during severe weather',
    description: 'HTML description for the link.',
  })
  @Prop()
  description: string;
}

export type UrlDocument = Url & Document;

export const UrlSchema = SchemaFactory.createForClass(Url);
