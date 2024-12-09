import { events } from "core";
import Image from "next/image";
import Link from "next/link";
import QRCode from "react-qr-code";

export default function PageEvents() {
  return (
    <div className="grid grid-cols-3 gap-5">
      {events.map((event) => (
        <div
          key={event.id}
          className="
        flex flex-col w-full overflow-hidden
        bg-zinc-800 rounded-lg
        "
        >
          <div className="relative w-full h-52">
            <Image
              src={event.image}
              fill
              alt={event.name}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center flex-1 p-7 gap-5 text-center">
            <span className="text-lg font-black">{event.name}</span>
            <p className="flex-1 text-sm text-zinc-400">
              {event.description}
            </p>
            <QRCode
              value={JSON.stringify({ id: event.id, password: event.password })}
              className="w-44 h-44"
            />
            <div className="flex gap-5">
              <Link
                className="flex-1 button red"
                href={`/evento/admin/${event.id}/${event.password}`}
              >
                Admin
              </Link>
              <Link
                className="flex-1 button green"
                href={`/convite/${event.alias}`}
              >
                Convite
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
