import { CompanyPayload } from './company-payload';

export interface UserPayload {
    sub: number;
    id: string;
    email: string;
    userName: string;
    name: string;
    iat?: number;
    exp?: number;
    company?: CompanyPayload;
    role: string;
}
