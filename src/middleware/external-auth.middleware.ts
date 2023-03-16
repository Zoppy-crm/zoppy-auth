import { BadRequestException, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Company, User, ExternalToken } from '@ZoppyTech/models';
import { ProviderNames } from '@ZoppyTech/utilities';
import { NextFunction, Request, Response } from 'express';
import { SessionService } from '../session/session.service';

@Injectable()
export class ExternalAuthMiddleware implements NestMiddleware {
    public constructor(@Inject(ProviderNames.Session) private readonly session: SessionService) {}

    public async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token: string = req.headers['authorization'].replace('Bearer ', '');
            const externalToken: ExternalToken = await ExternalToken.findOne({
                where: {
                    hash: token,
                    active: true
                }
            });
            const company: Company = await Company.findByPk(externalToken.companyId);
            const user: User = await User.findByPk(externalToken.userId);
            this.session.setCompany(company);
            this.session.setUser(user);
            next();
        } catch (ex) {
            throw new BadRequestException('Token inválido');
        }
    }
}
