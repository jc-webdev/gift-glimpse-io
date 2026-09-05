import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { groupName, priorityMeta, type Idea } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function Screen({
  children,
  withTabs = true,
}: {
  children: ReactNode;
  withTabs?: boolean;
}) {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="app-glow" />
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col">
        {children}
        {withTabs ? <TabBar /> : null}
      </div>
    </div>
  );
}

export function TopBar({
  eyebrow,
  title,
  right,
  back,
  children,
}: {
  eyebrow?: string;
  title: string;
  right?: ReactNode;
  back?: { to: string; label?: string };
  children?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 px-5 pb-3 pt-[calc(env(safe-area-inset-top)+14px)]">
      <div className="glass-strong ring-hi rounded-3xl px-5 pb-4 pt-4 ring-1 ring-frost/70">
        {back ? (
          <Link
            to={back.to}
            className="press mb-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-mute"
          >
            <span aria-hidden>←</span> {back.label ?? "Wróć"}
          </Link>
        ) : null}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {eyebrow ? (
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-mute">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="mt-1 max-w-[18ch] font-display text-[26px] font-medium leading-tight text-ink">
              {title}
            </h1>
          </div>
          {right}
        </div>
        {children}
      </div>
    </header>
  );
}

export function Main({ children }: { children: ReactNode }) {
  return <main className="flex-1 space-y-7 px-5 pb-40 pt-4">{children}</main>;
}

export function SectionHead({ title, aside }: { title: string; aside?: ReactNode }) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="font-display text-[20px] font-medium text-ink">{title}</h2>
      {aside ? <div className="text-[13px] font-medium text-accent">{aside}</div> : null}
    </div>
  );
}

export function Card({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={cn("glass ring-hi rounded-3xl ring-1 ring-frost/60", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "warm" | "danger" | "ink";
  className?: string;
}) {
  const tones = {
    neutral: "bg-frost/80 text-mute ring-1 ring-line",
    accent: "bg-accent-soft text-accent",
    warm: "bg-warm/30 text-warm-ink",
    danger: "bg-danger-soft text-danger",
    ink: "bg-ink text-bg",
  } as const;
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PriorityPill({ priority, short = false }: { priority: Idea["priority"]; short?: boolean }) {
  const meta = priorityMeta[priority];
  const tone = priority === "bardzo" ? "warm" : priority === "chce" ? "accent" : "neutral";
  return (
    <Pill tone={tone}>
      {meta.emoji} {short ? meta.short : meta.label}
    </Pill>
  );
}

export function VisibilityPill({ visibility }: { visibility: string[] }) {
  return <Pill tone="neutral">{visibility.map(groupName).join(", ")}</Pill>;
}

export function IdeaCard({
  idea,
  to,
  compact = false,
  reserved,
}: {
  idea: Idea;
  to: string;
  compact?: boolean;
  reserved?: "me" | "other";
}) {
  return (
    <Link to={to} className="press block">
      <Card className="rise overflow-hidden">
        <div className="relative">
          <img
            src={idea.image}
            alt={idea.title}
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
          {reserved ? (
            <div className="absolute left-3 top-3">
              <Pill tone={reserved === "me" ? "accent" : "neutral"}>
                {reserved === "me" ? "🔒 Zarezerwowane przez Ciebie" : "🔒 Ktoś już to rezerwuje"}
              </Pill>
            </div>
          ) : null}
          {idea.favorite ? (
            <div className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-frost/85 text-[13px]">
              ★
            </div>
          ) : null}
        </div>
        <div className={cn("pb-4 pt-3", compact ? "px-3.5" : "px-4")}>
          <div className="flex items-center justify-between gap-2">
            <PriorityPill priority={idea.priority} short={compact} />
            {!compact ? <VisibilityPill visibility={idea.visibility} /> : null}
          </div>
          <h3
            className={cn(
              "mt-2.5 font-semibold text-ink",
              compact ? "text-[14px] leading-tight" : "text-[15px]",
            )}
          >
            {idea.title}
          </h3>
          {!compact ? <p className="mt-0.5 text-[13px] text-mute">{idea.note}</p> : null}
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[14px] font-medium text-ink">
              {idea.price ? `${idea.price} zł` : "bez ceny"}
            </span>
            <span className="text-[12px] text-mute">{idea.store}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function PersonRow({ person, to }: { person: { name: string; avatar: string; relation: string; birthday: string }; to: string }) {
  return (
    <Link to={to} className="press block">
      <Card className="flex items-center gap-3 p-3">
        <img
          src={person.avatar}
          alt={person.name}
          loading="lazy"
          className="size-12 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold text-ink">{person.name}</h3>
          <p className="text-[13px] text-mute">{person.relation}</p>
        </div>
        <Pill tone="neutral">🎂 {person.birthday}</Pill>
      </Card>
    </Link>
  );
}

export function EmptyState({
  emoji,
  title,
  text,
  action,
}: {
  emoji: string;
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <Card className="rise px-6 py-10 text-center">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-accent-soft text-[22px]">
        {emoji}
      </div>
      <h3 className="mt-4 font-display text-[19px] font-medium text-ink">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-[26ch] text-[13px] leading-relaxed text-mute">{text}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </Card>
  );
}

export function ErrorState({ onRetry, text }: { onRetry: () => void; text?: string }) {
  return (
    <Card className="rise px-6 py-10 text-center">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-danger-soft text-[22px]">
        ⚠️
      </div>
      <h3 className="mt-4 font-display text-[19px] font-medium text-ink">Nie udało się wczytać</h3>
      <p className="mx-auto mt-1.5 max-w-[28ch] text-[13px] leading-relaxed text-mute">
        {text ?? "Połączenie chwilowo nie odpowiada. Twoje dane są bezpieczne."}
      </p>
      <button onClick={onRetry} className="press mt-4 rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-bg">
        Spróbuj ponownie
      </button>
    </Card>
  );
}

export function SkeletonCard({ compact = false }: { compact?: boolean }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square w-full animate-pulse bg-line/60" />
      <div className={cn("space-y-2 pb-4 pt-3", compact ? "px-3.5" : "px-4")}>
        <div className="h-4 w-24 animate-pulse rounded-full bg-line/60" />
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-line/50" />
        <div className="h-3 w-1/3 animate-pulse rounded-full bg-line/40" />
      </div>
    </Card>
  );
}

export function SkeletonRow() {
  return (
    <Card className="flex items-center gap-3 p-3">
      <div className="size-12 shrink-0 animate-pulse rounded-full bg-line/60" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-line/60" />
        <div className="h-3 w-1/3 animate-pulse rounded-full bg-line/40" />
      </div>
    </Card>
  );
}

export function AddIdeaCta({ label = "Dodaj pomysł" }: { label?: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[92px] z-30 flex justify-center px-5">
      <Link
        to="/dodaj"
        className="press ring-hi pointer-events-auto flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-accent-foreground"
      >
        <span className="grid size-5 place-items-center text-[18px] leading-none">+</span>
        {label}
      </Link>
    </div>
  );
}

const tabs = [
  { to: "/pomysly", label: "Pomysły", icon: "✦" },
  { to: "/ludzie", label: "Ludzie", icon: "◍" },
  { to: "/prezenty", label: "Prezenty", icon: "❀" },
  { to: "/ja", label: "Ja", icon: "☾" },
] as const;

export function TabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md px-5 pb-[calc(env(safe-area-inset-bottom)+14px)]">
      <div className="glass-strong ring-hi flex items-center justify-between rounded-3xl px-2 py-2 ring-1 ring-frost/70">
        {tabs.map((tab) => {
          const active = pathname === tab.to || pathname.startsWith(`${tab.to}/`);
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={cn(
                "press flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2",
                active ? "bg-ink/90 text-bg" : "text-mute",
              )}
            >
              <span className="grid size-5 place-items-center text-[13px] font-semibold">
                {tab.icon}
              </span>
              <span className="text-[11px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
