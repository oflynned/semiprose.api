import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DecodedToken = createParamDecorator(
  (_data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.token;
  },
);
