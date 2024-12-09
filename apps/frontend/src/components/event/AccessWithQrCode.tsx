import type { Event } from "core";
import QRCode from "react-qr-code";

export interface AccessWithQrCodeProps {
  event: Event;
}

export default function AccessWithQrCode(props: AccessWithQrCodeProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 border border-zinc-800 px-10">
      <span className="text-sm font-light text-zinc-400">
        Acesse via Mobile
      </span>
      <QRCode
        value={JSON.stringify({
          id: props.event.id,
          password: props.event.password,
        })}
        className="w-32 h-32"
      />
    </div>
  );
}
