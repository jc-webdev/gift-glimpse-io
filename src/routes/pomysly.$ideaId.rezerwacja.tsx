import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Main, Pill, Screen, TopBar } from "@/components/app-ui";
import { personById } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/pomysly/$ideaId/rezerwacja")({
  head: () => ({
    meta: [
      { title: "Cicha rezerwacja prezentu — Widoczek" },
      {
        name: "description",
        content:
          "Zarezerwuj prezent tak, aby nikt nie kupił go po drugi raz. Właściciel pomysłu nigdy nie zobaczy rezerwacji.",
      },
      { property: "og:title", content: "Cicha rezerwacja prezentu — Widoczek" },
      {
        property: "og:description",
        content: "Rezerwacja widoczna tylko dla znajomych, nigdy dla obdarowanego.",
      },
    ],
  }),
  component: Reservation,
});

function Reservation() {
  const { ideaId } = Route.useParams();
  const { find, reservations, reserve, cancelReservation } = useStore();
  const idea = find(ideaId);
  const reserved = idea ? reservations[idea.id] : undefined;

  if (!idea) {
    return (
      <Screen>
        <TopBar eyebrow="Rezerwacja" title="Ten pomysł jest niedostępny" back={{ to: "/ludzie" }} />
        <Main>
          <Card className="px-6 py-10 text-center text-[14px] text-mute">
            Pomysł mógł zostać ukryty przed Twoją grupą.
          </Card>
        </Main>
      </Screen>
    );
  }

  const owner = personById(idea.ownerId);

  return (
    <Screen>
      <TopBar
        eyebrow="Cicha rezerwacja"
        title={reserved === "me" ? "Zarezerwowane przez Ciebie" : "Zarezerwuj ten prezent"}
        back={{ to: "/ludzie", label: "Ludzie" }}
      />

      <Main>
        <Card className="rise overflow-hidden">
          <img
            src={idea.image}
            alt={idea.title}
            width={1024}
            height={1024}
            className="aspect-[16/10] w-full object-cover"
          />
          <div className="space-y-2 px-5 pb-5 pt-4">
            <h2 className="font-display text-[20px] font-medium text-ink">{idea.title}</h2>
            <p className="text-[13px] text-mute">
              {idea.price ? `${idea.price} zł` : "bez ceny"} · {idea.store}
            </p>
            {owner ? (
              <div className="flex items-center gap-2 pt-1">
                <img
                  src={owner.avatar}
                  alt={owner.name}
                  loading="lazy"
                  className="size-8 rounded-full object-cover"
                />
                <span className="text-[13px] text-mute">
                  Dla <span className="font-semibold text-ink">{owner.name}</span> · 🎂{" "}
                  {owner.birthday}
                </span>
              </div>
            ) : null}
          </div>
        </Card>

        <Card className="space-y-2 p-5">
          <Pill tone="accent">🔒 Pełna dyskrecja</Pill>
          <p className="text-[14px] leading-relaxed text-ink">
            Właściciel pomysłu nie zobaczy, że został zarezerwowany.
          </p>
          <p className="text-[13px] leading-relaxed text-mute">
            Rezerwację widzą tylko inne osoby z tej samej grupy — dzięki temu nikt nie kupi prezentu
            dwa razy.
          </p>
        </Card>

        {reserved === "other" ? (
          <Card className="space-y-3 p-5 text-center">
            <p className="text-[15px] font-semibold text-ink">Ktoś już to rezerwuje</p>
            <p className="text-[13px] text-mute">
              Nie pokazujemy kto — tak jest uczciwie. Wybierz inny pomysł albo dołącz do zbiórki.
            </p>
            <Link
              to="/prezenty"
              className="press inline-block rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-bg"
            >
              Zobacz prezenty
            </Link>
          </Card>
        ) : reserved === "me" ? (
          <div className="space-y-3">
            <Card className="p-5 text-center">
              <p className="text-[15px] font-semibold text-ink">Zarezerwowane przez Ciebie</p>
              <p className="mt-1 text-[13px] text-mute">
                Trzymamy to w tajemnicy do dnia wręczenia.
              </p>
            </Card>
            <button
              onClick={() => cancelReservation(idea.id)}
              className="press glass-strong ring-hi w-full rounded-full py-4 text-[15px] font-semibold text-ink ring-1 ring-frost/70"
            >
              Zwolnij rezerwację
            </button>
          </div>
        ) : (
          <button
            onClick={() => reserve(idea.id)}
            className="press ring-hi w-full rounded-full bg-accent py-4 text-[15px] font-semibold text-accent-foreground"
          >
            🔒 Zarezerwuj
          </button>
        )}
      </Main>
    </Screen>
  );
}
