import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { friendIdeas, myIdeas, type GroupId, type Idea, type Priority } from "./mock-data";

export type ReservationState = "me" | "other";

type NewIdea = {
  title: string;
  price: number | null;
  store: string;
  note: string;
  priority: Priority;
  visibility: GroupId[];
  image: string;
};

type Store = {
  ideas: Idea[];
  friends: Record<string, Idea[]>;
  reservations: Record<string, ReservationState>;
  toggleFavorite: (id: string) => void;
  addIdea: (idea: NewIdea) => string;
  reserve: (ideaId: string) => void;
  cancelReservation: (ideaId: string) => void;
  find: (id: string) => Idea | undefined;
};

const StoreContext = createContext<Store | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [ideas, setIdeas] = useState<Idea[]>(myIdeas);
  const [reservations, setReservations] = useState<Record<string, ReservationState>>({
    "anna-kolacja": "other",
    "marek-kawa": "other",
  });

  const toggleFavorite = useCallback((id: string) => {
    setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, favorite: !i.favorite } : i)));
  }, []);

  const addIdea = useCallback((idea: NewIdea) => {
    const id = `nowy-${Date.now()}`;
    setIdeas((prev) => [
      { ...idea, id, ownerId: "me", favorite: false, addedAt: "właśnie teraz" },
      ...prev,
    ]);
    return id;
  }, []);

  const reserve = useCallback((ideaId: string) => {
    setReservations((prev) => ({ ...prev, [ideaId]: "me" }));
  }, []);

  const cancelReservation = useCallback((ideaId: string) => {
    setReservations((prev) => {
      const next = { ...prev };
      delete next[ideaId];
      return next;
    });
  }, []);

  const value = useMemo<Store>(() => {
    const friends = friendIdeas;
    const find = (id: string) =>
      ideas.find((i) => i.id === id) ??
      Object.values(friends)
        .flat()
        .find((i) => i.id === id);
    return {
      ideas,
      friends,
      reservations,
      toggleFavorite,
      addIdea,
      reserve,
      cancelReservation,
      find,
    };
  }, [ideas, reservations, toggleFavorite, addIdea, reserve, cancelReservation]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore musi być użyty wewnątrz AppStoreProvider");
  return ctx;
}
