import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TweetModule } from './tweet/tweet.module';
import { EntityModule } from './entity/entity.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { MediaModule } from './media/media.module';
import { UrlModule } from './url/url.module';
import { PlaceModule } from './place/place.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/SNA'),
    TweetModule,
    EntityModule,
    HashtagModule,
    MediaModule,
    UrlModule,
    PlaceModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
