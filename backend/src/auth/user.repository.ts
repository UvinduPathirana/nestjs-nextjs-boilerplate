import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<{ message: string }> {
        const { email, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.create({email, password: hashedPassword});

        try {
            await this.save(user)
            return { message: 'User created successfully'}
        } catch (error) {
            if(error.code === '23505') {
                // Duplicate username
                throw new ConflictException('Email already exists')
            } else {
                throw new InternalServerErrorException()
            }

        }
    }
}