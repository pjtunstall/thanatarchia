import React from "react";
import { ChatEntry } from "@/types/gameTypes";
import { Badge } from "@/components/ui/badge";
import { CharacterDialog } from "@/components/game/CharacterProfile";

export function Chat({ entries }: { entries: ChatEntry[] }) {
  return (
    <div className="space-y-4">
      {entries.map((entry, i) => (
        <div key={i} className="border-l-4 border-primary pl-4 py-2">
          <div className="flex items-center gap-3 mb-2">
            <CharacterDialog character={entry.author} />
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{entry.author.name}</Badge>
              <span className="text-xs text-muted-foreground">
                {entry.date}
              </span>
            </div>
          </div>
          <p className="text-sm italic font-serif leading-relaxed">
            "{entry.statement}"
          </p>
        </div>
      ))}
    </div>
  );
}
