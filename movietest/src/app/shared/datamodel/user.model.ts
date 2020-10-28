export interface IUser  {
    
    
    email: string;
    password: string;
    error?: string;
    token?: string;
}

export class User {
    constructor(email: string, password: string) {
    }
}
