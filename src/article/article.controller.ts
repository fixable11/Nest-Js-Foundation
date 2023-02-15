import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  NotFoundException,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleService } from './article.service';
import { JwtAuthGuard } from '../user/auth/jwt.auth-guard';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtModule } from '@nestjs/jwt';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postList(@Body() createArticleDto: CreateArticleDto) {
    const article = await this.articleService.create(
      createArticleDto.article.title,
      createArticleDto.article.description,
      createArticleDto.article.body,
      createArticleDto.article.tagList,
    );

    return {
      article: article.toJson(),
    };
  }
}
