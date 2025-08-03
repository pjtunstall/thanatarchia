const avatarImages = import.meta.glob("/src/assets/*.jpg");

const avatarFilenames: Record<string, string> = {
  chroniclerBard: "chronicler-bard-female.jpg",
  chroniclerPoet: "chronicler-poet-female.jpg",
  chroniclerNun: "chronicler-nun-female.jpg",
  chroniclerScribe: "chronicler-scribe-male.jpg",
  chroniclerScholar: "chronicler-scholar-male.jpg",
  bagaudaeMaleRebel: "bagaudae-male-rebel.jpg",
  bagaudaeFemaleRebel: "bagaudae-female-rebel.jpg",
  mauriMaleLeader: "moor-king.jpg",
  mauriFemaleLeader: "moor-queen.jpg",
  mosaicKing: "mosaic-king.jpg",
  mosaicQueen: "mosaic-queen.jpg",
  mosaicWarriorQueen: "mosaic-warrior-queen.jpg",
  byzantineQueen: "byzantine-queen-portrait.jpg",
  byzantineChief: "byzantine-chief-portrait.jpg",
  romanEmperor: "roman-emperor-portrait.jpg",
  barbarianKing: "barbarian-king-portrait.jpg",
  barbarianQueen: "barbarian-queen.jpg",
  visigothicQueen: "visigothic-queen-portrait.jpg",
  vandalChief: "vandal-chief-portrait.jpg",
  hunnicWarlord: "hunnic-warlord-portrait.jpg",
  frankishKing: "frankish-king-portrait.jpg",
  manuscriptQueen: "manuscript-queen.jpg",
  suebianKing: "suebian-king.jpg",
  suebianQueen: "suebian-queen.jpg",
  helmetedMosaicQueen: "helmeted-mosaic-queen.jpg",
  moustacheKing: "moustache-king.jpg",
  hunQueen: "hun-queen.jpg",
  byzantineMosaicQueen: "byzantine-mosaic-queen.jpg",
};

export async function loadAvatar(
  key: keyof typeof avatarFilenames
): Promise<string> {
  const filename = avatarFilenames[key];
  const importFn = avatarImages[`/src/assets/${filename}`];
  if (!importFn) throw new Error(`Missing image: ${filename}`);
  const mod = (await importFn()) as { default: string };
  return mod.default;
}
