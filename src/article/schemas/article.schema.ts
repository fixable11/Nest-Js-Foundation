import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Tag } from './tag.schema';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  body: string;

  @Prop({ type: Number, required: false, default: 0 })
  favoritesCount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
  tags: Tag[];

  @Prop({ default: false })
  favorited: boolean;

  toJson: () => Record<string, any>;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

ArticleSchema.methods.toJson = function (): Record<string, any> {
  const { title, description, body, favoritesCount, author, tags, favorited } =
    this;

  return {
    title,
    description,
    body,
    favoritesCount,
    author: author.toJson(),
    tags: tags
      .map((tag) => tag.toJson())
      .reduce((a, b) => a.concat(Object.values(b)), []),
    favorited,
  };
};
