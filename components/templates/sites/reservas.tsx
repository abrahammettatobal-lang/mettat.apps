"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { stylePhotos } from "@/data/style-photos";
import { AppLogin, Frame, Photo, Swap } from "@/components/templates/sites/shared";

const slots = ["09:00", "10:30", "12:00", "16:00", "18:30"];
const staff = [
  { name: "Lina", photo: stylePhotos.lila.cut },
  { name: "Mora", photo: stylePhotos.lila.color },
];

export function ReservasPlay() {
  const [session, setSession] = useState(false);
  const [day, setDay] = useState(4);
  const [slot, setSlot] = useState<string | null>(null);
  const [who, setWho] = useState(staff[0].name);
  const [booked, setBooked] = useState(false);

  if (!session) {
    return (
      <AppLogin
        brand="Lila"
        accent="#7c3aed"
        onEnter={() => setSession(true)}
        className="bg-[#f5f0ff]"
        photo={stylePhotos.lila.salon}
      />
    );
  }

  return (
    <Frame className="bg-[#f5f0ff] text-[#3b0764]">
      <header className="relative h-40 overflow-hidden">
        <Photo id={stylePhotos.lila.salon} alt="Salón Lila" className="absolute inset-0" priority />
        <div className="absolute inset-0 bg-[#3b0764]/35" />
        <div className="absolute inset-0 flex items-end justify-between px-6 py-5 text-white">
          <div>
            <p className="text-lg font-semibold">Lila</p>
            <p className="text-sm text-white/80">Agosto</p>
          </div>
          <button type="button" className="text-sm" onClick={() => setSession(false)}>
            Salir
          </button>
        </div>
      </header>
      <Swap id={`${day}-${slot}-${who}-${booked}`}>
        <div className="flex-1 px-6 py-6 md:px-12">
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 21 }).map((_, index) => {
              const n = index + 1;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setDay(n);
                    setBooked(false);
                    setSlot(null);
                  }}
                  className={cn(
                    "grid h-12 place-items-center rounded-lg text-sm transition",
                    day === n ? "bg-[#7c3aed] text-white" : "bg-white hover:bg-[#ddd6fe]",
                  )}
                >
                  {n}
                </button>
              );
            })}
          </div>
          <p className="mt-6 text-sm font-medium">Estilista</p>
          <div className="mt-3 flex gap-3">
            {staff.map((person) => (
              <button
                key={person.name}
                type="button"
                onClick={() => setWho(person.name)}
                className={cn(
                  "flex items-center gap-2 rounded-full bg-white py-1 pr-3 pl-1 text-sm",
                  who === person.name && "ring-2 ring-[#7c3aed]",
                )}
              >
                <Photo id={person.photo} alt={person.name} className="size-8 rounded-full" />
                {person.name}
              </button>
            ))}
          </div>
          <p className="mt-6 text-sm font-medium">Horarios del día {day}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {slots.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setSlot(item);
                  setBooked(false);
                }}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition",
                  slot === item ? "bg-[#7c3aed] text-white" : "bg-white",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          {booked && slot ? (
            <p className="mt-6 text-sm">
              Cita con {who} el {day} de agosto a las {slot}. Te llega un recordatorio.
            </p>
          ) : (
            <button
              type="button"
              disabled={!slot}
              onClick={() => setBooked(true)}
              className="mt-6 rounded-full bg-[#7c3aed] px-4 py-2 text-sm text-white disabled:opacity-40"
            >
              Confirmar cita
            </button>
          )}
        </div>
      </Swap>
    </Frame>
  );
}
