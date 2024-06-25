import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';
// This is a custom decorator to get the user from the request object


export const GetUser = createParamDecorator((_data, ctx): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
}
)
