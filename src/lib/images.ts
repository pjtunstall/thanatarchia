import { avatarFilenames } from "@/data/avatars";

export function getAvatarUrl(key: keyof typeof avatarFilenames) {
  const filename = avatarFilenames[key];
  if (!filename) throw new Error(`Missing avatar: ${key}`);
  return `/images/${filename}`;
}
