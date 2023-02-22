import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@ZoppyTech/models';
import { NextFunction, Request, Response } from 'express';
import { SessionService } from 'src/services/session/session.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    public constructor(private readonly session: SessionService, private readonly jwtService: JwtService) {}

    public use(req: Request, res: Response, next: NextFunction) {
        try {
            const token: string = req.headers['authorization'].replace('Bearer ', '');
            const payload: any = this.jwtService.decode(token);
            this.session.setCompany(payload.company);
            this.session.setUser({
                id: payload.id,
                email: payload.email,
                userName: payload.userName,
                name: payload.name,
                password: undefined,
                role: payload.role,
                loginDate: new Date(),
                companyId: payload.company.id
            } as User);
            next();
        } catch (ex) {
            throw new BadRequestException('Token inválido');
        }
    }
}
