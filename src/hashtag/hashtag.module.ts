import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hashtag, HashtagSchema } from './schemas/hashtag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Hashtag.name,
        schema: HashtagSchema,
      },
    ]),
  ],
  controllers: [HashtagController],
  providers: [HashtagService],
})
export class HashtagModule {}
