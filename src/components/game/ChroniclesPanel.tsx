import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CharacterDialog } from "@/components/game/CharacterProfile";
import { ChatEntry } from "@/types/gameTypes";

type ChroniclesPanelProps = {
  chronicles: ChatEntry[];
};

export const ChroniclesPanel: React.FC<ChroniclesPanelProps> = ({
  chronicles,
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Chronicles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[666px] pr-2 pb-6 [background-color:hsl(var(--card))]">
          <ScrollArea className="h-full">
            <div className="space-y-4 mr-4 py-6">
              {chronicles.map((entry, i) => (
                <ChronicleItem key={i} entry={entry} />
              ))}
            </div>
          </ScrollArea>

          {/* Fades absolutely positioned over ScrollArea */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 h-6 z-10"
            style={{
              background: `linear-gradient(to bottom, hsl(var(--card)), transparent)`,
            }}
          />
          <div
            className="pointer-events-none absolute bottom-6 left-0 right-0 h-6 z-10"
            style={{
              background: `linear-gradient(to top, hsl(var(--card)), transparent)`,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

function ChronicleItem({ entry }: { entry: ChatEntry }) {
  return (
    <div className="border-l-4 border-primary pl-4 py-2">
      <div className="flex items-center gap-3 mb-2">
        <CharacterDialog character={entry.author} />
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{entry.author.name}</Badge>
          <span className="text-xs text-muted-foreground">{entry.date}</span>
        </div>
      </div>
      <p className="text-sm italic font-serif leading-relaxed">
        "{entry.statement}"
      </p>
    </div>
  );
}
