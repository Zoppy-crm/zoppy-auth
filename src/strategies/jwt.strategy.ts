import { UserPayload } from '../models/user-payload';
import { UserFromJwt } from '../models/user-from-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    public async validate(payload: UserPayload): Promise<UserFromJwt> {
        return {
            id: payload.id,
            email: payload.email,
            name: payload.name
        };
    }
}
