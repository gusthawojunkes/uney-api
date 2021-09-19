export default class Credential {
    private username: string;
    private password: string;

    constructor(body: any) {
        this.username = body.username;
        this.password = body.password;
    }

    public getUsername = (): string => {
        return this.username;
    };

    public getPassword = (): string => {
        return this.password;
    };
}
