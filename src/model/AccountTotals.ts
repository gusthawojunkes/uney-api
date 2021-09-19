export default class AccountTotals {
    private totalInput: number = 0;
    private totalOutput: number = 0;
    private totalInputToday: number = 0;
    private totalOutputToday: number = 0;

    public getTotalInput(): number {
        return this.totalInput;
    }

    public setTotalInput(totalInput: number): void {
        this.totalInput = totalInput;
    }

    public getTotalOutput(): number {
        return this.totalOutput;
    }

    public setTotalOutput(totalOutput: number): void {
        this.totalOutput = totalOutput;
    }

    public getTotalInputToday(): number {
        return this.totalInputToday;
    }

    public setTotalInputToday(totalInputToday: number): void {
        this.totalInputToday = totalInputToday;
    }

    public getTotalOutputToday(): number {
        return this.totalOutputToday;
    }

    public setTotalOutputToday(totalOutputToday: number): void {
        this.totalOutputToday = totalOutputToday;
    }
}
