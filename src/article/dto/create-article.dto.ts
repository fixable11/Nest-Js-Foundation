import {
  IsNotEmpty,
  IsObject,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class Article {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  body: string;

  @IsArray()
  @IsOptional()
  tagList: string[];
}

export class CreateArticleDto {
  @ValidateNested()
  @IsObject()
  @IsNotEmpty()
  @Type(() => Article)
  article: Article;
}
