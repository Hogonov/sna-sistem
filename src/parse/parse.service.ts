import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { FileService } from '../file/file.service';
import { Tweet, TweetDocument } from '../tweet/schemas/tweet.schema';

@Injectable()
export class ParseService {
  constructor(
    private fileService: FileService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
  ) {}

  async createUser(path, name) {
    try {
      const file: string = this.fileService.getFileForParseDB(
        path.split('/'),
        name,
      );
      return JSON.parse(file);
    } catch (e) {
      console.log(e);
    }
  }

  async createTweet(path, name) {
    try {
      const file: string = JSON.parse(
        this.fileService.getFileForParseDB(path.split('/'), name),
      );

      const tweets = file['data']['globalObjects']['tweets'];

      return tweets;
    } catch (e) {
      console.log(e);
    }
  }
}
