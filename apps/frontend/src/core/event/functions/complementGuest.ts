import type Guest from "../model/Guest";
import validateGuest from "./validateGuest";

export default function processGuest(guest: Partial<Guest>): Guest {
  const errors = validateGuest(guest);

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  const qtyCompanions = guest.qtyCompanions ?? 0;
  const hasCompanion =
    guest.hasCompanion && guest.confirmed && qtyCompanions > 0;

  const guestUpdated = {
    ...guest,
    qtyCompanions: hasCompanion ? qtyCompanions : 0,
    hasCompanion,
  } as Guest;

  return guestUpdated;
}
