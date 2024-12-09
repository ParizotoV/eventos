"use client";
import DashboardEvent from "@/components/event/DashboardEvent";
import FormPasswordEvent from "@/components/event/FormPasswordEvent";
import { Event, events, type Guest } from "core";
import { use, useEffect, useState } from "react";

export default function PageAdminEvent(props: any) {
  const params: any = use(props.params);

  const id = params.todos[0];
  const [event, setEvent] = useState<Event | null>(null);
  const [password, setPassword] = useState<string | null>(
    params.todos[1] ?? null
  );

  const confirmed = event?.guests.filter((guest) => guest.confirmed);
  const away = event?.guests.filter((guest) => !guest.confirmed);
  const totalGeral =
    confirmed?.reduce((total: number, guest: Guest) => {
      return total + guest.qtyCompanions + 1;
    }, 0) ?? 0;

  function loadEvent() {
    const event = events.find(
      (event) => event.id === id && event.password === password
    );
    setEvent(event ?? null);
  }

  useEffect(() => {
    loadEvent();
  }, [id, password]);

  return (
    <div className="flex flex-col items-center">
      {event ? (
        <DashboardEvent
          away={away ?? []}
          confirmed={confirmed ?? []}
          totalGeral={totalGeral}
          event={event}
        />
      ) : (
        <FormPasswordEvent />
      )}
    </div>
  );

  return event ? (
    <div className="flex flex-col">
      <span>{event.name}</span>
    </div>
  ) : null;
}
