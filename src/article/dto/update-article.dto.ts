import { ValidateNested, IsOptional, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class Article {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  body?: string;

  @IsOptional()
  tagList: string[];
}

export class UpdateArticleDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Article)
  article: Article;
}
