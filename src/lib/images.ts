import { avatarFilenames } from "@/data/avatars";

const avatarImages = import.meta.glob("/src/assets/*.jpg");

export async function loadAvatar(
  key: keyof typeof avatarFilenames
): Promise<string> {
  const filename = avatarFilenames[key];
  const importFn = avatarImages[`/src/assets/${filename}`];
  if (!importFn) throw new Error(`Missing image: ${filename}`);
  const mod = (await importFn()) as { default: string };
  return mod.default;
}
