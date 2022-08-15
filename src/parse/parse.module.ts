import { Module } from '@nestjs/common';
import { ParseService } from './parse.service';
import { ParseController } from './parse.controller';
import { FileService } from '../file/file.service';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Tweet, TweetSchema } from '../tweet/schemas/tweet.schema';

const importSchemas = [
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: Tweet.name,
    schema: TweetSchema,
  },
];

@Module({
  imports: [MongooseModule.forFeature(importSchemas)],
  controllers: [ParseController],
  providers: [ParseService, FileService],
})
export class ParseModule {}
