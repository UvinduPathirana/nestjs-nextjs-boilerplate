import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-interface.payload';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{ message: string }> {
            return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { email, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ where: { email } }) ;
        if(user && await bcrypt.compare(password, user.password)){
            const payLoad: JwtPayload = { email };
            const accessToken = this.jwtService.sign(payLoad);
            return { accessToken }
        } else {
            throw new UnauthorizedException('Please check your login credentials') 
        }
    }
}