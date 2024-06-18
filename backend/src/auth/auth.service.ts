import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-interface.payload';
import { User } from './user.entity';
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

    async reset(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { email, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ where: { email } }) ;
        if(user){
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt)
            user.password = hashedPassword;
            try {
                await this.userRepository.save(user);
                return user;
            } catch (error) {
                throw new UnauthorizedException(error.message);
            }
        } else {
            throw new UnauthorizedException('Could not update the password');
        }
    }
}