import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ExternalIdMiddlewareHelper } from '../helpers/external-id-middleware.helper';
import { SessionService } from '../session/session.service';

@Injectable()
export class ExternalIdMiddleware implements NestMiddleware {
    public constructor(private readonly session: SessionService) {}

    public async use(req: Request, res: Response, next: NextFunction) {
        const id: string = req.query['id'] as string;
        const companyId: string = req.query['companyId'] as string;

        await ExternalIdMiddlewareHelper.execute(
            {
                session: this.session
            },
            {
                id: id,
                companyId: companyId
            }
        );
        next();
    }
}
