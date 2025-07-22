import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CharacterDialog } from "@/components/game/CharacterProfile";
import { ChatEntry } from "@/types/gameTypes";
import { ScrollAreaWithFade } from "@/components/ui-custom/ScrollAreaWithFade";

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
        <ScrollAreaWithFade height="h-[666px]">
          <div className="space-y-4">
            {chronicles.map((entry, i) => (
              <ChronicleItem key={i} entry={entry} />
            ))}
          </div>
        </ScrollAreaWithFade>
      </CardContent>
    </Card>
  );
};

function ChronicleItem({ entry }: { entry: ChatEntry }) {
  return (
    <div className="pl-4 py-2">
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
