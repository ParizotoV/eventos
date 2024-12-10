import { v4 as uuid, validate as validateUuid } from "uuid";

export default class Id {
  static new(): string {
    return uuid();
  }

  static valid(id: string): boolean {
    return validateUuid(id);
  }
}
