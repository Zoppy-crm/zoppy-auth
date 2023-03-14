import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Company, User } from '@ZoppyTech/models';
import { NextFunction, Request, Response } from 'express';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    public constructor(private readonly session: SessionService, private readonly jwtService: JwtService) {}

    public async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token: string = req.headers['authorization'].replace('Bearer ', '');
            const payload: any = this.jwtService.decode(token);
            const company: Company = await Company.findByPk(payload.company.id);
            const user: User = await User.findByPk(payload.id);
            this.session.setCompany(company);
            this.session.setUser(user);
            next();
        } catch (ex) {
            throw new BadRequestException('Token inválido');
        }
    }
}
