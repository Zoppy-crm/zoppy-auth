import { ProviderNames } from '@ZoppyTech/utilities';
import { SessionService } from '../session/session.service';

export const sessionProviders: any = [
    {
        provide: ProviderNames.Session,
        useValue: SessionService
    }
];
