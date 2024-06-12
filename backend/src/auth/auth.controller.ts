import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

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

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req){
        console.log(req)
    }
}