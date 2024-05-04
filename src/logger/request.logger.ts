import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HttpLogger');

  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl } = request;
    const start = Date.now();

    response.on('close', () => {
      const { statusCode } = response;

      this.logger.log(
        [
          `${method} ${originalUrl}`,
          statusCode,
          `${Date.now() - start}ms`,
        ].join(' - '),
      );
    });

    next();
  }
}
