import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card, Pill, Screen } from "@/components/app-ui";
import kawa from "@/assets/idea-kawa.jpg";
import notes from "@/assets/idea-notes.jpg";
import koncert from "@/assets/idea-koncert.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Widoczek — prywatne wishlisty i prezenty bez pytania" },
      {
        name: "description",
        content:
          "Zapisuj pomysły na rzeczy, doświadczenia i wydarzenia, a potem decyduj, które grupy je widzą. Bliscy trafiają w punkt, niespodzianka zostaje niespodzianką.",
      },
      { property: "og:title", content: "Widoczek — prywatne wishlisty i prezenty" },
      {
        property: "og:description",
        content: "Prywatna kolekcja pomysłów na prezenty, którą udostępniasz tylko wybranym.",
      },
    ],
  }),
  component: Onboarding,
});

const slides = [
  {
    eyebrow: "Krok 1 z 3",
    title: "Zapisz wszystko, co Ci się spodobało",
    text: "Rzeczy, doświadczenia, wydarzenia. Wklej link albo dodaj ręcznie w kilka sekund.",
    image: kawa,
    pills: ["Rzeczy", "Doświadczenia", "Wydarzenia"],
  },
  {
    eyebrow: "Krok 2 z 3",
    title: "Ty decydujesz, kto to widzi",
    text: "Każdy pomysł ma własną widoczność: tylko Ty, Rodzina, Znajomi albo ekipa z padla.",
    image: notes,
    pills: ["🔒 Tylko ja", "🏡 Rodzina", "🌿 Znajomi", "🎾 Padel"],
  },
  {
    eyebrow: "Krok 3 z 3",
    title: "Niespodzianka zostaje niespodzianką",
    text: "Bliscy mogą po cichu zarezerwować prezent. Nigdy nie zobaczysz, że coś zostało zajęte.",
    image: koncert,
    pills: ["🔒 Cicha rezerwacja"],
  },
];

function Onboarding() {
  const [step, setStep] = useState(0);
  const slide = slides[step];
  const last = step === slides.length - 1;

  return (
    <Screen withTabs={false}>
      <main className="flex flex-1 flex-col px-5 pb-10 pt-[calc(env(safe-area-inset-top)+28px)]">
        <div className="flex items-center justify-between">
          <p className="font-display text-[18px] font-medium text-ink">Widoczek</p>
          <Link to="/pomysly" className="press text-[13px] font-medium text-mute">
            Pomiń
          </Link>
        </div>

        <Card className="rise mt-6 overflow-hidden" key={step}>
          <img
            src={slide.image}
            alt=""
            width={1024}
            height={1024}
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="px-5 pb-6 pt-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-mute">
              {slide.eyebrow}
            </p>
            <h1 className="mt-2 font-display text-[27px] font-medium leading-tight text-ink">
              {slide.title}
            </h1>
            <p className="mt-2.5 text-[14px] leading-relaxed text-mute">{slide.text}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {slide.pills.map((p) => (
                <Pill key={p} tone="neutral">
                  {p}
                </Pill>
              ))}
            </div>
          </div>
        </Card>

        <div className="mt-auto pt-8">
          <div className="mb-5 flex justify-center gap-1.5">
            {slides.map((s, i) => (
              <span
                key={s.title}
                className={
                  i === step ? "h-1.5 w-6 rounded-full bg-ink" : "h-1.5 w-1.5 rounded-full bg-line"
                }
              />
            ))}
          </div>
          {last ? (
            <Link
              to="/pomysly"
              className="press ring-hi flex w-full items-center justify-center rounded-full bg-accent py-4 text-[15px] font-semibold text-accent-foreground"
            >
              Zaczynamy
            </Link>
          ) : (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="press ring-hi flex w-full items-center justify-center rounded-full bg-ink py-4 text-[15px] font-semibold text-bg"
            >
              Dalej
            </button>
          )}
          <p className="mt-3 text-center text-[12px] text-mute">
            Prototyp — dane są przykładowe i zostają na Twoim urządzeniu.
          </p>
        </div>
      </main>
    </Screen>
  );
}
