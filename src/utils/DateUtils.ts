export default class DateUtils {
    public static format(date: Date): string {
        let formatted: string = '';
        if (date === null || date === undefined) {
            date = new Date();
        }

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        formatted = `${date.toLocaleDateString()} - ${hours}:${minutes}:${seconds}`;

        return formatted;
    }

    public static formatNow(): string {
        return this.format(new Date());
    }
}
