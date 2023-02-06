import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = 500;
    let error = 'Internal Server Error';
    let message: string[] = [];

    console.log('exception', exception);

    // Neo.ClientError.Schema.ConstraintValidationFailed
    // Node(54776) already exists with label `User` and property `email` = 'duplicate@email.com'
    if (exception.message.includes('already exists with')) {
      statusCode = 400;
      error = 'Bad Request';

      const [_, property] = exception.message.match(/`([a-z0-9]+)`/gi);
      message = [`${property.replace(/`/g, '')} already taken`];
    }
    // Neo.ClientError.Schema.ConstraintValidationFailed
    // Node(54778) with label `Test` must have the property `mustExist`
    else if (exception.message.includes('must have the property')) {
      statusCode = 400;
      error = 'Bad Request';

      const [_, property] = exception.message.match(/`([a-z0-9]+)`/gi);
      message = [`${property.replace(/`/g, '')} should not be empty`];
    } else if (exception.getStatus() === 400) {
      statusCode = 400;
      error = 'Bad Request';
      message = (exception.getResponse() as { message: string[] }).message;
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error,
    });
  }
}
