import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { FileService } from '../file/file.service';
import { Tweet, TweetDocument } from '../tweet/schemas/tweet.schema';
import { Entity, EntityDocument } from '../entity/schemas/entity.schema';
import { Hashtag, HashtagDocument } from '../hashtag/schemas/hashtag.schema';
import {
  UserMention,
  UserMentionDocument,
} from '../entity/schemas/user-mention.schema';
import { Url, UrlDocument } from '../url/schemas/url.schema';
import {
  ConvertType,
  ConvertTypeService,
} from '../middlewares/converType/convertType.service';
import { Media, MediaDocument } from '../media/schemas/media.schema';

@Injectable()
export class ParseService {
  constructor(
    private fileService: FileService,
    private convertTypeService: ConvertTypeService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
    @InjectModel(Entity.name) private entityModel: Model<EntityDocument>,
    @InjectModel(Hashtag.name) private hashtagModel: Model<HashtagDocument>,
    @InjectModel(UserMention.name)
    private userMentionModel: Model<UserMentionDocument>,
    @InjectModel(Url.name) private urlModel: Model<UrlDocument>,
    @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
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
      const tweetsRefactor = Object.entries(tweets).map((entry) => entry[1]);
      const mainData = [];
      for (const tweetsRefactorElement of tweetsRefactor) {
        const data = {
          tweet: null,
          entity: null,
          hashtags: null,
          user_mentions: null,
          urls: null,
          media: null,
        };
        data.tweet = tweetsRefactorElement;
        data.entity = data.tweet['entities'];
        data.hashtags = data.entity['hashtags'];
        data.user_mentions = data.entity['user_mentions'];
        data.urls = data.entity['urls'];
        data.media = data.entity['media'];

        const urls = await this.urlModel.insertMany(data.urls);
        const user_mentions = await this.userMentionModel.insertMany(
          data.user_mentions,
        );
        const hashtags = await this.hashtagModel.insertMany(data.hashtags);
        const media = await this.mediaModel.insertMany(data.media);
        const entity = await this.entityModel.create({
          ...data.entity,
          hashtags: hashtags.map((elem) => elem._id),
          user_mentions: user_mentions.map((elem) => elem._id),
          urls: urls.map((elem) => elem._id),
          media: media.map((elem) => elem._id),
        });
        const convertField = [
          {
            field: 'is_quote_status',
            originType: ConvertType.STRING,
            toType: ConvertType.BOOLEAN,
          },
          {
            field: 'favorited',
            originType: ConvertType.STRING,
            toType: ConvertType.BOOLEAN,
          },
          {
            field: 'retweeted',
            originType: ConvertType.STRING,
            toType: ConvertType.BOOLEAN,
          },
        ];
        const collectedJSON: any = await this.convertTypeService.renameKeys(
          data.tweet,
          [],
          [],
          convertField,
        );

        const tweets = await this.tweetModel.create({
          ...collectedJSON,
          entities: entity._id,
        });

        data.tweet = tweets;
        data.entity = entity;
        data.hashtags = hashtags;
        data.user_mentions = user_mentions;
        data.urls = urls;
        mainData.push(data);
      }

      return mainData;
    } catch (e) {
      console.log(e);
    }
  }
}
