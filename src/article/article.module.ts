import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema, Article } from './schemas/article.schema';
import { CommentSchema, Comment } from './schemas/comment.schema';
import { TagSchema, Tag } from './schemas/tag.schema';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
  ],
})
export class ArticleModule {}
