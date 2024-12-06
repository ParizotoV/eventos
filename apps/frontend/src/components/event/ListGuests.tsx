import type { Guest } from "@/core";
import GuestItem from "./GuestItem";

export interface ListGuestsProps {
  guests: Guest[];
}

export default function ListGuest(props: ListGuestsProps) {
  return (
    <div>
      <ul className="flex flex-col gap-2">
        {props.guests.map((guest) => (
          <GuestItem guest={guest} key={guest.id} />
        ))}
      </ul>
    </div>
  );
}
