import { Global, Module } from '@nestjs/common';
import { sessionProviders } from '../providers/session.providers';

@Global()
@Module({
    exports: [{ ...sessionProviders }],
    providers: [{ ...sessionProviders }]
})
export class SessionModule {}
