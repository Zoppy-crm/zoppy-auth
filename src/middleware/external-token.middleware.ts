import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ExternalTokenMiddlewareHelper } from '../helpers/external-token-middleware.helper';
import { SessionService } from '../session/session.service';

@Injectable()
export class ExternalTokenMiddleware implements NestMiddleware {
    public constructor(private readonly session: SessionService) {}

    public async use(req: Request, res: Response, next: NextFunction) {
        const token: string = req.query['token'] as string;
        const companyId: string = req.query['companyId'] as string;
        await ExternalTokenMiddlewareHelper.execute(
            {
                session: this.session
            },
            {
                token: token,
                companyId: companyId
            }
        );
        next();
    }
}
