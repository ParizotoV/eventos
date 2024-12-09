import type { Event } from "core";
import Information from "../shared/Information";

export interface InformationEventProps {
  event: Event;
  className?: string;
}

export default function InformationEvent(props: InformationEventProps) {
  const { event } = props;

  return (
    <div className={`flex flex-col gap-2 ${props.className ?? ""}`}>
      <div className="flex-1 flex items-center gap-4 border border-zinc-800 px-6 py-3 rounded-lg">
        <span className="text-2xl font-black">{event.alias}:</span>
        <span className="text-xl text-zinc-300">{event.name}</span>
      </div>
      <div className="flex gap-2">
        <Information label="Data:">
          {new Date(event.date!).toLocaleDateString()}
          {" às "}
          {new Date(event.date!).toLocaleTimeString()}
        </Information>
        <Information label="Local:">{event.local}</Information>
      </div>
      <Information label="Descrição:">{event.description}</Information>
    </div>
  );
}
