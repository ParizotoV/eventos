import { Id } from "@/core/shared";
import type Event from "../model/Event";

export default function createEventEmpty(): Partial<Event> {
  return {
    id: Id.new(),
    name: "",
    description: "",
    date: new Date(),
    local: "",
    expectedAudience: 1,
    image: "",
    imageBackground: "",
  };
}
