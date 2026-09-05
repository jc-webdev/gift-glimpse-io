import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AddIdeaCta,
  EmptyState,
  IdeaCard,
  Main,
  Screen,
  SectionHead,
  SkeletonCard,
  TopBar,
} from "@/components/app-ui";
import { me, type Priority } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import { useMockFetch } from "@/lib/use-mock-fetch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pomysly/")({
  head: () => ({
    meta: [
      { title: "Twoje pomysły — Widoczek" },
      {
        name: "description",
        content:
          "Wszystkie zapisane pomysły w jednym miejscu: priorytety, ceny, sklepy i widoczność dla wybranych grup.",
      },
      { property: "og:title", content: "Twoje pomysły — Widoczek" },
      {
        property: "og:description",
        content: "Prywatna kolekcja pomysłów z priorytetami i widocznością dla grup.",
      },
    ],
  }),
  component: IdeasScreen,
});

type Filter = "wszystkie" | Priority | "ulubione";

const filters: { id: Filter; label: string }[] = [
  { id: "wszystkie", label: "Wszystkie" },
  { id: "bardzo", label: "🔥 Bardzo chcę" },
  { id: "chce", label: "❤️ Chcę" },
  { id: "moze", label: "🤷 Może kiedyś" },
  { id: "ulubione", label: "Ulubione" },
];

function IdeasScreen() {
  const { ideas } = useStore();
  const [filter, setFilter] = useState<Filter>("wszystkie");
  const { state, data } = useMockFetch(ideas, { delay: 700 });

  const list = data ?? [];
  const visible = list.filter((idea) => {
    if (filter === "wszystkie") return true;
    if (filter === "ulubione") return idea.favorite;
    return idea.priority === filter;
  });
  const recent = visible.slice(0, 2);
  const rest = visible.slice(2);

  return (
    <Screen>
      <TopBar
        eyebrow="Zapiski prezentowe"
        title="Co ostatnio wpadło Ci w oko?"
        right={
          <img
            src={me.avatar}
            alt={me.name}
            width={512}
            height={512}
            className="mt-0.5 size-11 shrink-0 rounded-full object-cover"
          />
        }
      >
        <div className="no-bar -mx-5 mt-4 overflow-x-auto px-5">
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "press ring-hi-sm shrink-0 rounded-full px-4 py-2 text-[13px] font-medium",
                  filter === f.id ? "bg-ink text-bg" : "glass text-ink ring-1 ring-frost/60",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </TopBar>

      <Main>
        {state === "loading" ? (
          <section className="space-y-4">
            <SkeletonCard />
            <div className="grid grid-cols-2 gap-3">
              <SkeletonCard compact />
              <SkeletonCard compact />
            </div>
          </section>
        ) : visible.length === 0 ? (
          <EmptyState
            emoji="✦"
            title={filter === "ulubione" ? "Brak ulubionych" : "Nic w tym filtrze"}
            text={
              filter === "ulubione"
                ? "Oznacz gwiazdką pomysł, do którego wracasz najczęściej."
                : "Zmień filtr albo dopisz coś nowego do kolekcji."
            }
            action={
              <button
                onClick={() => setFilter("wszystkie")}
                className="press rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-bg"
              >
                Pokaż wszystkie
              </button>
            }
          />
        ) : (
          <>
            <section>
              <SectionHead title="Ostatnio dodane" aside={`${visible.length} pomysłów`} />
              <div className="mt-3 space-y-4">
                {recent.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
            </section>

            {rest.length > 0 ? (
              <section>
                <SectionHead title="Wszystkie pomysły" aside={String(rest.length)} />
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {rest.map((idea, i) => (
                    <div key={idea.id} className={i % 2 === 1 ? "pt-5" : undefined}>
                      <IdeaCard idea={idea} compact />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section>
              <SectionHead title="Ulubione" aside={`${list.filter((i) => i.favorite).length}`} />
              <div className="mt-3 space-y-4">
                {list.filter((i) => i.favorite).length === 0 ? (
                  <EmptyState
                    emoji="★"
                    title="Jeszcze nic tu nie ma"
                    text="Gwiazdką oznaczysz pomysły, które są dla Ciebie najważniejsze."
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {list
                      .filter((i) => i.favorite)
                      .map((idea) => (
                        <IdeaCard key={idea.id} idea={idea} compact />
                      ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </Main>

      <AddIdeaCta />
    </Screen>
  );
}
