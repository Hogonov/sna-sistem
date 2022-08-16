import { Module } from '@nestjs/common';
import { ParseService } from './parse.service';
import { ParseController } from './parse.controller';
import { FileService } from '../file/file.service';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Tweet, TweetSchema } from '../tweet/schemas/tweet.schema';
import { Entity, EntitySchema } from '../entity/schemas/entity.schema';
import { Hashtag, HashtagSchema } from '../hashtag/schemas/hashtag.schema';
import {
  UserMention,
  UserMentionSchema,
} from '../entity/schemas/user-mention.schema';
import { Url, UrlSchema } from '../url/schemas/url.schema';
import { ConvertTypeService } from '../middlewares/converType/convertType.service';
import { Media, MediaSchema } from '../media/schemas/media.schema';

const importSchemas = [
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: Tweet.name,
    schema: TweetSchema,
  },
  {
    name: Entity.name,
    schema: EntitySchema,
  },
  {
    name: Hashtag.name,
    schema: HashtagSchema,
  },
  {
    name: UserMention.name,
    schema: UserMentionSchema,
  },
  {
    name: Url.name,
    schema: UrlSchema,
  },
  {
    name: Media.name,
    schema: MediaSchema,
  },
];

@Module({
  imports: [MongooseModule.forFeature(importSchemas)],
  controllers: [ParseController],
  providers: [ParseService, FileService, ConvertTypeService],
})
export class ParseModule {}
