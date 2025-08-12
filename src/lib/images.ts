import { avatarFilenames } from "@/data/avatars";

export async function loadAvatar(
  key: keyof typeof avatarFilenames
): Promise<string> {
  const filename = avatarFilenames[key];
  if (!filename) throw new Error(`Missing avatar: ${key}`);
  return `/images/${filename}`;
}
