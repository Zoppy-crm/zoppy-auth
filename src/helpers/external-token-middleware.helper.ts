import { BadRequestException } from '@nestjs/common';
import { ExternalToken, Company, User } from '@ZoppyTech/models';
import { SessionService } from '../session/session.service';

export class ExternalTokenMiddlewareHelper {
    public static async execute(domains: Domains, params: Params): Promise<boolean> {
        const externalToken: ExternalToken = await ExternalToken.findOne({
            where: {
                hash: params.token
            }
        });
        if (!externalToken || !externalToken.active || externalToken.companyId !== params.companyId) {
            throw new BadRequestException('Token inválido');
        }
        const company: Company = await Company.findByPk(externalToken.companyId);
        domains.session.setCompany(company);
        const user: User = await User.findByPk(externalToken.userId);
        domains.session.setUser(user);
        return true;
    }
}

interface Domains {
    session: SessionService;
}

interface Params {
    token: string;
    companyId: string;
}
