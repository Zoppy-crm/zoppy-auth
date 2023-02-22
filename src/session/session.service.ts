import { Injectable, Scope } from '@nestjs/common';
import { User, Company } from '@ZoppyTech/models';
import { AppConstants } from '@ZoppyTech/utilities';
import { Transaction } from 'sequelize';

@Injectable({ scope: Scope.REQUEST })
export class SessionService {
    public companyId: string;
    private user: User;
    private company: Company;
    private transaction: Transaction;

    public getUser(): User {
        return this.user as User;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public getCompany(): Company {
        return this.company;
    }

    public setCompany(company: Company): void {
        this.company = company;
    }

    public getTransaction(): Transaction | null {
        return this.transaction ?? null;
    }

    public setTransaction(transaction: Transaction): void {
        this.transaction = transaction;
    }

    public isMasterUser(): boolean {
        return this.user?.role === AppConstants.ROLES.MASTER;
    }
}
