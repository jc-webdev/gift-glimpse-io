import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Main, Pill, PriorityPill, Screen, SkeletonCard, TopBar } from "@/components/app-ui";
import { groupName, groups, personById, priorityMeta } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import { useMockFetch } from "@/lib/use-mock-fetch";

export const Route = createFileRoute("/pomysly/$ideaId/")({
  head: () => ({
    meta: [
      { title: "Szczegóły pomysłu — Widoczek" },
      {
        name: "description",
        content: "Cena, sklep, komentarz, priorytet i lista grup, które widzą ten pomysł.",
      },
      { property: "og:title", content: "Szczegóły pomysłu — Widoczek" },
      {
        property: "og:description",
        content: "Podgląd pomysłu z priorytetem, ceną i ustawieniami widoczności.",
      },
    ],
  }),
  component: IdeaDetail,
});

function IdeaDetail() {
  const { ideaId } = Route.useParams();
  const { find, reservations, toggleFavorite } = useStore();
  const idea = find(ideaId);
  const { state } = useMockFetch(idea, { delay: 500 });

  if (!idea) {
    return (
      <Screen>
        <TopBar eyebrow="Pomysł" title="Nie znaleźliśmy tego pomysłu" back={{ to: "/pomysly" }} />
        <Main>
          <Card className="px-6 py-10 text-center">
            <p className="text-[14px] text-mute">
              Mógł zostać usunięty albo zmieniła się jego widoczność.
            </p>
            <Link
              to="/pomysly"
              className="press mt-4 inline-block rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-bg"
            >
              Wróć do pomysłów
            </Link>
          </Card>
        </Main>
      </Screen>
    );
  }

  const mine = idea.ownerId === "me";
  const owner = mine ? null : personById(idea.ownerId);
  const reserved = reservations[idea.id];

  return (
    <Screen>
      <TopBar
        eyebrow={mine ? "Twój pomysł" : `Pomysł ${owner?.name ?? ""}`}
        title={idea.title}
        back={{ to: mine ? "/pomysly" : "/ludzie", label: mine ? "Pomysły" : "Ludzie" }}
      />

      <Main>
        {state === "loading" ? (
          <SkeletonCard />
        ) : (
          <>
            <Card className="rise overflow-hidden">
              <img
                src={idea.image}
                alt={idea.title}
                width={1024}
                height={1024}
                className="aspect-square w-full object-cover"
              />
              <div className="space-y-3 px-5 pb-5 pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <PriorityPill priority={idea.priority} />
                  {mine ? <Pill tone="neutral">{idea.visibility.map(groupName).join(", ")}</Pill> : null}
                  {reserved ? (
                    <Pill tone={reserved === "me" ? "accent" : "neutral"}>
                      {reserved === "me" ? "🔒 Zarezerwowane przez Ciebie" : "🔒 Ktoś już to rezerwuje"}
                    </Pill>
                  ) : null}
                </div>
                <div className="flex items-end justify-between">
                  <span className="font-display text-[24px] font-medium text-ink">
                    {idea.price ? `${idea.price} zł` : "bez ceny"}
                  </span>
                  <span className="text-[13px] text-mute">{idea.store}</span>
                </div>
                <p className="text-[14px] leading-relaxed text-mute">{idea.note}</p>
                <p className="text-[12px] text-mute">Dodane {idea.addedAt}</p>
              </div>
            </Card>

            {mine ? (
              <>
                <Card className="p-5">
                  <h2 className="font-display text-[18px] font-medium text-ink">Kto to widzi</h2>
                  <div className="mt-3 space-y-2">
                    {groups.map((g) => {
                      const on = idea.visibility.includes(g.id);
                      return (
                        <div
                          key={g.id}
                          className="flex items-center justify-between rounded-2xl bg-frost/70 px-3.5 py-3"
                        >
                          <span className="text-[14px] font-medium text-ink">
                            {g.emoji} {g.name}
                          </span>
                          <Pill tone={on ? "accent" : "neutral"}>{on ? "widzi" : "nie widzi"}</Pill>
                        </div>
                      );
                    })}
                  </div>
                  <Link
                    to="/grupy"
                    className="press mt-4 inline-block text-[13px] font-medium text-accent"
                  >
                    Zarządzaj grupami →
                  </Link>
                </Card>

                <button
                  onClick={() => toggleFavorite(idea.id)}
                  className="press ring-hi glass-strong w-full rounded-full py-4 text-[15px] font-semibold text-ink ring-1 ring-frost/70"
                >
                  {idea.favorite ? "★ Usuń z ulubionych" : "☆ Dodaj do ulubionych"}
                </button>
              </>
            ) : (
              <>
                <Card className="p-5">
                  <p className="text-[13px] leading-relaxed text-mute">
                    {owner?.name} oznaczył ten pomysł jako{" "}
                    <span className="font-semibold text-ink">
                      {priorityMeta[idea.priority].label.toLowerCase()}
                    </span>
                    . Możesz go po cichu zarezerwować — właściciel tego nie zobaczy.
                  </p>
                </Card>
                <Link
                  to="/pomysly/$ideaId/rezerwacja"
                  params={{ ideaId: idea.id }}
                  className="press ring-hi flex w-full items-center justify-center rounded-full bg-accent py-4 text-[15px] font-semibold text-accent-foreground"
                >
                  {reserved === "me" ? "Zarezerwowane przez Ciebie" : "🔒 Zarezerwuj"}
                </Link>
              </>
            )}
          </>
        )}
      </Main>
    </Screen>
  );
}
