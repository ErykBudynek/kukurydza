const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const heroImage = asset("assets/hero-kernel-facade.webp");

export const chapters = [
  { id: "fasada", label: "Fasada" },
  { id: "rzedy", label: "Rzędy" },
  { id: "przekroj", label: "Przekrój" },
  { id: "teatr", label: "Teatr" },
  { id: "korytarz", label: "Korytarz" },
  { id: "dowod", label: "Dowód" },
];

export const facts = [
  {
    value: "800+",
    label: "ziaren na przeciętnej kolbie — tyle „okien” ma jedna fasada",
  },
  {
    value: "16",
    label: "rzędów wokół rdzenia — konstrukcja, nie dekoracja",
  },
  {
    value: "Zea mays",
    label: "gatunek, który zbudował cywilizacje, zanim zbudował strony",
  },
];

export const materials = [
  { name: "Emalia", detail: "lakierowane złoto komórki, #F2C14E" },
  { name: "Bloom", detail: "pomarańcz zmierzchu w oknie, #E85D04" },
  { name: "Łuska", detail: "papierowy krem osłony, #F7F1E1" },
  { name: "Szczelina", detail: "zieleń liścia między rzędami, #3D6B2F" },
];

export const layers = [
  {
    id: "luska",
    title: "Łuska",
    body: "Osłona jak kurtyna. Chroni ziarno, a na stronie robi teatralny peel.",
  },
  {
    id: "ziarno",
    title: "Ziarno",
    body: "Komórka fasady. Moduł, rytm, światło. Nie „produkt na stocku”.",
  },
  {
    id: "rdzen",
    title: "Rdzeń",
    body: "Konstrukcja kolby. Tu trzyma się cały układ rzędów.",
  },
  {
    id: "pyl",
    title: "Pyłek / jedwab",
    body: "Delikatne nitki u szczytu — jak anteny budynku, nie ozdoba.",
  },
];

export const kernels = [
  {
    id: "architektura",
    title: "Architektura",
    body: "Kolba to elewacja. Rzędy = piętra. Światło w komórce = życie w oknie.",
  },
  {
    id: "cywilizacja",
    title: "Cywilizacja",
    body: "Mezoameryka zbudowała mitologie wokół kukurydzy. My budujemy stronę wokół jej formy.",
  },
  {
    id: "kuchnia",
    title: "Kuchnia",
    body: "Masa, polenta, popcorn — ziarno zmienia skórę, ale fasada zostaje w pamięci.",
  },
  {
    id: "genom",
    title: "Genom",
    body: "Zea mays to maszyneria powtórzeń. Design bierze z tego rytm, nie raport.",
  },
  {
    id: "noc",
    title: "Noc na polu",
    body: "Zmierzch zapala wyobraźnię: to nie pejzaż, to skyline z łuski.",
  },
  {
    id: "impeccable",
    title: "Impeccable",
    body: "Skill nie „upiększa kukurydzę”. Wybiera świat i broni go do końca.",
  },
];

export const corridor = [
  "Emalia",
  "Bloom",
  "Moduł",
  "Rytm",
  "Peel",
  "Dusk",
  "Rdzeń",
  "Okno",
  "Szczelina",
  "Kolba",
];
