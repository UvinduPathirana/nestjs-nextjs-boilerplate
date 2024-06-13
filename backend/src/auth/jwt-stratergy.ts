import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { JwtPayload } from "./jwt-interface.payload";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
        super({
            secretOrKey: 'topSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })

    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload;
        const user: User = await this.userRepository.findOne({ where: { email }});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}