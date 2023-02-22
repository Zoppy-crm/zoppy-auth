import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SessionModule } from '../session/session.module';

@Module({
    controllers: [],
    imports: [SessionModule],
    providers: [JwtService]
})
export class MiddlewareModule {}
