import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { ArticleDocument, Article } from './schemas/article.schema';
import { TagDocument, Tag } from './schemas/tag.schema';
import { CommentDocument, Comment } from './schemas/comment.schema';

type ArticleResponse = {
  articlesCount: number;
  articles: Record<string, any>[];
};

@Injectable({ scope: Scope.REQUEST })
export class ArticleService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel(Article.name)
    private readonly _articleModel: Model<ArticleDocument>,
    @InjectModel(Tag.name)
    private readonly _tagModel: Model<TagDocument>,
    @InjectModel(Comment.name)
    private readonly _commentModel: Model<CommentDocument>,
  ) {}

  async create(
    title: string,
    description: string,
    body: string,
    tagList: string[],
  ): Promise<Article> {
    const tagIds = [];
    for (const tagName of tagList) {
      const tag = await this._tagModel.findOneAndUpdate(
        { name: tagName },
        {},
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
          timestamps: false,
        },
      );
      tagIds.push(tag.id);
    }
    const article = await this._articleModel.create({
      title,
      description,
      body,
      author: this.request.user,
      tags: tagIds,
    });

    return await article.populate('tags');
  }
}
