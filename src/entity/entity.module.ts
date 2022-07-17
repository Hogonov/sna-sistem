import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Entity, EntitySchema } from './schemas/entity.schema';
import { UserMention, UserMentionSchema } from './schemas/user-mention.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Entity.name,
        schema: EntitySchema,
      },
      {
        name: UserMention.name,
        schema: UserMentionSchema,
      },
    ]),
  ],
  controllers: [EntityController],
  providers: [EntityService],
})
export class EntityModule {}
