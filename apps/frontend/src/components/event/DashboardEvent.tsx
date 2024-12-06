import { Event, type Guest } from "@/core";
import Statistics from "../shared/Statistics";
import AccessWithQrCode from "./AccessWithQrCode";
import InformationEvent from "./InformationEvent";
import ListGuest from "./ListGuests";

export interface DashboardEventProps {
  event: Event;
  confirmed: Guest[];
  away: Guest[];
  totalGeral: number;
}

export default function DashboardEvent(props: DashboardEventProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 self-stretch">
        <InformationEvent event={props.event} className="flex-1" />
        <AccessWithQrCode event={props.event} />
      </div>
      <div className="grid grid-cols-3 gap-6 mt-4">
        <Statistics
          text="Expectativa de Convidados:"
          value={props.event.expectedAudience}
          image="/icones/convidados.svg"
        />
        <Statistics
          text="Confirmações:"
          value={props.confirmed.length}
          image="/icones/confirmados.svg"
        />
        <Statistics
          text="Total Confirmado:"
          value={props.totalGeral}
          image="/icones/acompanhantes.svg"
        />
      </div>

      <button className="button blue self-end mt-12">
        <span>Atualizar Lista de Convidados</span>
      </button>

      <span className="flex py-2 text-xl font-bold text-white/80">
        Convidados que confirmaram PRESENÇA
      </span>
      <ListGuest guests={props.confirmed} />
      <span className="flex py-2 text-xl font-bold text-white/80">
        Convidados que confirmaram AUSÊNCIA
      </span>
      <ListGuest guests={props.away} />
    </div>
  );
}
