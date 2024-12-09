import { Id, Password } from "../../shared";
import type Event from "../model/Event";
import validateEvent from "./validateEvent";

export default function complementEvent(eventPartial: Partial<Event>): Event {
  const errors = validateEvent(eventPartial);

  if (errors.length) {
    throw new Error(errors.join("\n"));
  }

  const event: Event = {
    ...eventPartial,
    id: eventPartial.id ?? Id.new(),
    password: eventPartial.password ?? Password.create(20),
    expectedAudience: +(eventPartial.expectedAudience ?? 1),
  } as Event;

  return event;
}
