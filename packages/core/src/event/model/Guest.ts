export default interface Guest {
  id: string;
  name: string;
  email: string;
  confirmed: boolean;
  hasCompanion: boolean;
  qtyCompanions: number;
}
