import { Id } from "@/core/shared";
import type Guest from "../model/Guest";

export default function createGuestEmpty(): Partial<Guest> {
  return {
    id: Id.new(),
    name: "",
    email: "",
    confirmed: true,
    hasCompanion: false,
    qtyCompanions: 0,
  };
}
