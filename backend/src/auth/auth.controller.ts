import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // Signup route
    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ message: string }> {
        return this.authService.signUp(authCredentialsDto)
    }

    // Signin route
    @Post('/signin')
    signIn(@Body() authCredentialsDto : AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto)
    }

    @Post('/reset')
    reset(@Body() authCredentialsDto : AuthCredentialsDto): Promise<User> {
        return this.authService.reset(authCredentialsDto)
    }
}