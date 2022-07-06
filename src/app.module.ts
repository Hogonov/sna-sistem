import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import { TweetModule } from './tweet/tweet.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
       MongooseModule.forRoot('mongodb://localhost:27017/SNA'),
       TweetModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}