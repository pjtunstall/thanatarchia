import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAreaWithFade } from "@/components/game/ScrollAreaWithFade";
import { CharacterDialog } from "@/components/game/CharacterProfile";

import { ChatEntry } from "@/types/gameTypes";

export type ChatItemRenderingOptions = {
  getBadgeColor?: (entry: ChatEntry) => string | undefined;
};

type ChatProps = {
  items: ChatEntry[];
  renderItem?: (item: ChatEntry, index: number) => React.ReactNode;
  options?: ChatItemRenderingOptions;
};

export function Chat({ items, renderItem, options }: ChatProps) {
  return (
    <ScrollAreaWithFade height="h-full">
      <div className="space-y-4 p-4 pb-8">
        {items.map((item, index) =>
          (renderItem ?? defaultRenderChatItem)(item, index, options)
        )}
      </div>
    </ScrollAreaWithFade>
  );
}

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * The default function for rendering a single chat item.
 *
 * This function renders a chat item in the format:
 *
 * 
/*******  fc811535-72ee-47af-8660-60b51b8ffb42  *******/ function defaultRenderChatItem(
  entry: ChatEntry,
  index: number,
  options?: ChatItemRenderingOptions
) {
  const badgeColor = options?.getBadgeColor?.(entry);

  return (
    <div key={index} className="py-2">
      <div className="flex items-center gap-3 mb-2">
        <CharacterDialog character={entry.author} />
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            style={badgeColor ? { backgroundColor: badgeColor } : undefined}
          >
            {entry.author.name}
          </Badge>
          {entry.date && (
            <span className="text-xs text-muted-foreground">{entry.date}</span>
          )}
        </div>
      </div>
      <p className="text-sm italic font-serif leading-relaxed">
        "{entry.statement}"
      </p>
    </div>
  );
}
