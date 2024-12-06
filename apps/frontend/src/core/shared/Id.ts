export default class Id {
  static new(): string {
    return `${this.hash()}-${this.hash()}-${this.hash()}`;
  }

  private static hash(): string {
    return Math.random().toString(36).substr(2, 15);
  }
}

for (let i = 0; i < 100; i++) {
  console.log(Id.new());
}