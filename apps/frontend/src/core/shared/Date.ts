export default class Datee {
  static format(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, "0");

    const d = date ?? new Date();
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  static parse(date: string): Date {
    const [year, month, day, hours, minutes] = date.split(/[-T:]/).map(Number);

    return new Date(year, month - 1, day, hours, minutes);
  }
}
