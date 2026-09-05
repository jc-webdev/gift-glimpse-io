import kawa from "@/assets/idea-kawa.jpg";
import skarpety from "@/assets/idea-skarpety.jpg";
import doniczka from "@/assets/idea-doniczka.jpg";
import notes from "@/assets/idea-notes.jpg";
import sluchawki from "@/assets/idea-sluchawki.jpg";
import padel from "@/assets/idea-padel.jpg";
import koncert from "@/assets/idea-koncert.jpg";
import kolacja from "@/assets/idea-kolacja.jpg";
import avatarMe from "@/assets/avatar-me.jpg";
import avatarAnna from "@/assets/avatar-anna.jpg";
import avatarMarek from "@/assets/avatar-marek.jpg";
import avatarKasia from "@/assets/avatar-kasia.jpg";
import avatarTomek from "@/assets/avatar-tomek.jpg";

export type Priority = "bardzo" | "chce" | "moze";

export const priorityMeta: Record<Priority, { label: string; short: string; emoji: string }> = {
  bardzo: { label: "Bardzo chcę", short: "Bardzo", emoji: "🔥" },
  chce: { label: "Chcę", short: "Chcę", emoji: "❤️" },
  moze: { label: "Może kiedyś", short: "Kiedyś", emoji: "🤷" },
};

export type GroupId = "tylko-ja" | "rodzina" | "znajomi" | "padel";

export const groups: {
  id: GroupId;
  name: string;
  emoji: string;
  description: string;
  members: string[];
}[] = [
  {
    id: "tylko-ja",
    name: "Tylko ja",
    emoji: "🔒",
    description: "Prywatna szuflada. Nikt inny tego nie widzi.",
    members: [],
  },
  {
    id: "rodzina",
    name: "Rodzina",
    emoji: "🏡",
    description: "Mama, tata, Marek i Kasia.",
    members: ["anna", "marek", "kasia"],
  },
  {
    id: "znajomi",
    name: "Znajomi",
    emoji: "🌿",
    description: "Ludzie, z którymi widujesz się co tydzień.",
    members: ["anna", "tomek", "kasia"],
  },
  {
    id: "padel",
    name: "Padel",
    emoji: "🎾",
    description: "Ekipa z kortu Południe, czwartki 20:00.",
    members: ["marek", "tomek"],
  },
];

export const groupName = (id: string) => groups.find((g) => g.id === id)?.name ?? id;

export type Idea = {
  id: string;
  ownerId: string;
  title: string;
  note: string;
  price: number | null;
  store: string;
  image: string;
  priority: Priority;
  visibility: GroupId[];
  favorite: boolean;
  addedAt: string;
};

export const me = {
  id: "me",
  name: "Julia Chmielewska",
  avatar: avatarMe,
  birthday: "12 marca 1994",
  city: "Warszawa",
};

export type Person = {
  id: string;
  name: string;
  avatar: string;
  birthday: string;
  birthdayIn: number;
  relation: string;
  groups: GroupId[];
};

export const people: Person[] = [
  {
    id: "anna",
    name: "Anna Wrona",
    avatar: avatarAnna,
    birthday: "24 września",
    birthdayIn: 19,
    relation: "Siostra",
    groups: ["rodzina", "znajomi"],
  },
  {
    id: "marek",
    name: "Marek Dąbek",
    avatar: avatarMarek,
    birthday: "3 października",
    birthdayIn: 28,
    relation: "Tata",
    groups: ["rodzina", "padel"],
  },
  {
    id: "kasia",
    name: "Kasia Lipa",
    avatar: avatarKasia,
    birthday: "17 listopada",
    birthdayIn: 73,
    relation: "Kuzynka",
    groups: ["rodzina", "znajomi"],
  },
  {
    id: "tomek",
    name: "Tomek Reja",
    avatar: avatarTomek,
    birthday: "8 grudnia",
    birthdayIn: 94,
    relation: "Padel, czwartki",
    groups: ["znajomi", "padel"],
  },
];

export const personById = (id: string) => people.find((p) => p.id === id);

export const myIdeas: Idea[] = [
  {
    id: "kawa",
    ownerId: "me",
    title: "Zestaw do kawy pour-over",
    note: "Ceramiczna czajnia + dripper. Najlepiej w kolorze szałwii.",
    price: 249,
    store: "Materia Studio",
    image: kawa,
    priority: "bardzo",
    visibility: ["rodzina", "znajomi"],
    favorite: true,
    addedAt: "wczoraj",
  },
  {
    id: "skarpety",
    ownerId: "me",
    title: "Swetrowe skarpety wełniane",
    note: "Grube, do domu, kolor owsiany. Rozmiar 38.",
    price: 59,
    store: "Snug",
    image: skarpety,
    priority: "chce",
    visibility: ["tylko-ja"],
    favorite: false,
    addedAt: "3 dni temu",
  },
  {
    id: "doniczka",
    ownerId: "me",
    title: "Doniczka ceramiczna",
    note: "Do paproci w sypialni, średnica ok. 16 cm.",
    price: 89,
    store: "Kwiat",
    image: doniczka,
    priority: "moze",
    visibility: ["rodzina"],
    favorite: false,
    addedAt: "tydzień temu",
  },
  {
    id: "notes",
    ownerId: "me",
    title: "Skórzany notes z piórem",
    note: "Na zapiski z podróży, format A5, gładkie kartki.",
    price: 129,
    store: "Papier & Tusz",
    image: notes,
    priority: "bardzo",
    visibility: ["rodzina", "znajomi", "padel"],
    favorite: true,
    addedAt: "tydzień temu",
  },
  {
    id: "sluchawki",
    ownerId: "me",
    title: "Słuchawki nauszne",
    note: "Do pracy z domu, ważne wygodne pałąki.",
    price: 749,
    store: "Audio Nova",
    image: sluchawki,
    priority: "chce",
    visibility: ["rodzina"],
    favorite: false,
    addedAt: "2 tygodnie temu",
  },
  {
    id: "padel-karnet",
    ownerId: "me",
    title: "Karnet na padla",
    note: "Cztery wejścia na kort Południe. Czwartki 20:00.",
    price: 180,
    store: "Kort Południe",
    image: padel,
    priority: "moze",
    visibility: ["padel", "znajomi"],
    favorite: false,
    addedAt: "3 tygodnie temu",
  },
];

export const friendIdeas: Record<string, Idea[]> = {
  anna: [
    {
      id: "anna-koncert",
      ownerId: "anna",
      title: "Bilety na koncert w Gdańsku",
      note: "Maj, najlepiej dwa miejsca obok siebie.",
      price: 220,
      store: "Bilety Fala",
      image: koncert,
      priority: "bardzo",
      visibility: ["rodzina", "znajomi"],
      favorite: false,
      addedAt: "4 dni temu",
    },
    {
      id: "anna-kolacja",
      ownerId: "anna",
      title: "Kolacja degustacyjna dla dwojga",
      note: "Coś sezonowego, bez mięsa.",
      price: 480,
      store: "Restauracja Sień",
      image: kolacja,
      priority: "chce",
      visibility: ["rodzina"],
      favorite: false,
      addedAt: "2 tygodnie temu",
    },
    {
      id: "anna-notes",
      ownerId: "anna",
      title: "Notes w twardej oprawie",
      note: "Do rysowania, papier 120 g.",
      price: 129,
      store: "Papier & Tusz",
      image: notes,
      priority: "moze",
      visibility: ["znajomi"],
      favorite: false,
      addedAt: "miesiąc temu",
    },
  ],
  marek: [
    {
      id: "marek-padel",
      ownerId: "marek",
      title: "Rakieta do padla",
      note: "Średnia twardość, uchwyt owinięty.",
      price: 690,
      store: "Sport Ostoja",
      image: padel,
      priority: "bardzo",
      visibility: ["rodzina", "padel"],
      favorite: false,
      addedAt: "5 dni temu",
    },
    {
      id: "marek-kawa",
      ownerId: "marek",
      title: "Młynek żarnowy",
      note: "Ręczny, do kawy przelewowej.",
      price: 320,
      store: "Palarnia Ostro",
      image: kawa,
      priority: "chce",
      visibility: ["rodzina"],
      favorite: false,
      addedAt: "3 tygodnie temu",
    },
  ],
  kasia: [
    {
      id: "kasia-doniczka",
      ownerId: "kasia",
      title: "Paproć w ceramice",
      note: "Do nowego mieszkania na Pradze.",
      price: 89,
      store: "Kwiat",
      image: doniczka,
      priority: "chce",
      visibility: ["rodzina", "znajomi"],
      favorite: false,
      addedAt: "tydzień temu",
    },
    {
      id: "kasia-skarpety",
      ownerId: "kasia",
      title: "Wełniane skarpety",
      note: "Rozmiar 37, ciepłe na zimę.",
      price: 59,
      store: "Snug",
      image: skarpety,
      priority: "moze",
      visibility: ["znajomi"],
      favorite: false,
      addedAt: "miesiąc temu",
    },
  ],
  tomek: [],
};

export const allIdeas = [...myIdeas, ...Object.values(friendIdeas).flat()];
export const ideaById = (id: string) => allIdeas.find((i) => i.id === id);

export type GiftProject = {
  id: string;
  ideaId: string;
  forPersonId: string;
  occasion: string;
  collected: number;
  target: number;
  contributors: string[];
  deadline: string;
  status: "aktywny" | "zakonczony";
};

export const giftProjects: GiftProject[] = [
  {
    id: "g1",
    ideaId: "marek-padel",
    forPersonId: "marek",
    occasion: "Urodziny taty",
    collected: 420,
    target: 690,
    contributors: ["anna", "kasia", "tomek"],
    deadline: "do 1 października",
    status: "aktywny",
  },
  {
    id: "g2",
    ideaId: "anna-koncert",
    forPersonId: "anna",
    occasion: "Urodziny Anny",
    collected: 220,
    target: 220,
    contributors: ["kasia"],
    deadline: "do 22 września",
    status: "aktywny",
  },
  {
    id: "g3",
    ideaId: "kasia-doniczka",
    forPersonId: "kasia",
    occasion: "Parapetówka Kasi",
    collected: 89,
    target: 89,
    contributors: ["anna", "tomek"],
    deadline: "wręczone 14 sierpnia",
    status: "zakonczony",
  },
];
