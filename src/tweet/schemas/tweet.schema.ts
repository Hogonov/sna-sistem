import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export type TweetDocument = Tweet & Document;

@Schema()
export class Tweet {
    @ApiProperty({
        example: 1050118621198921728,
        description: 'The integer representation of the unique identifier for this Tweet. This number is greater than 53 bits and some programming languages may have difficulty/silent defects in interpreting it. Using a signed 64 bit integer for storing this identifier is safe. Use id_str to fetch the identifier to be safe. See Twitter IDs for more information.'
    })
    @Prop()
    idTweet: number;

    @Prop()
    createdAt: Date;

    @ApiProperty({
        example: 'To make room for more expression, we will now count all emojis as equal—including those with gender‍‍‍ ‍‍and skin t… https://t.co/MkGjXf9aXm',
        description: 'The actual UTF-8 text of the status update. See twitter-text for details on what characters are currently considered valid. '
    })
    @Prop()
    fullText: string;

    /*    @Prop()
        entities: Object;*/

    @ApiProperty({
        example: 'Twitter Web Client',
        description: 'Utility used to post the Tweet, as an HTML-formatted string. Tweets from the Twitter website have a source value of web.'
    })
    @Prop()
    source: string;

    @ApiProperty({
        example: 0,
        description: ''
    })
    @Prop()
    inReplyToStatusId: number;

    @ApiProperty({
        example: 0,
        description: ''
    })
    @Prop()
    inReplyToUserId: number;

    @ApiProperty({
        example: 0,
        description: ''
    })
    @Prop()
    inReplyToScreenName: string;

    @ApiProperty({
        example: 0,
        description: ''
    })
    @Prop()
    userId: number;

    @ApiProperty({
        example: 0,
        description: ''
    })
    @Prop()
    geo: string;

    @ApiProperty({
        example: 0,
        description: ''
    })
    @Prop()
    coordinates: string;

    @ApiProperty({
        example: 0,
        description: ''
    })
    @Prop()
    place: string;

    @ApiProperty({
        example: 0,
        description: ''
    })
    @Prop()
    retweetCount: string;

    @ApiProperty({
        example: 0,
        description: ''
    })
    @Prop()
    favoriteCount: string;

    @ApiProperty({
        example: 0,
        description: ''
    })
    @Prop()
    replyCount: string;

}

export const TweetSchema = SchemaFactory.createForClass(Tweet);