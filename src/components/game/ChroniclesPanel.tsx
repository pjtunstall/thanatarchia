import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CharacterDialog } from "@/components/game/CharacterDialog";
import { Chronicle, Chronicler } from "@/types/gameTypes";
import { getDate, chroniclers } from "@/data/gameData";

interface ChroniclesPanelProps {
  chronicles: Chronicle[];
  chroniclers: Chronicler[];
}

export const ChroniclesPanel: React.FC<ChroniclesPanelProps> = ({
  chronicles,
}) => {
  const getChroniclerInfo = (chroniclerName: string) =>
    chroniclers.find((c) => c.name === chroniclerName);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Chronicles</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh)]">
          <div className="space-y-4">
            {chronicles
              .slice()
              .reverse()
              .map((chronicle) => {
                const chronicler = getChroniclerInfo(chronicle.chronicler);
                if (!chronicler) return null;
                return (
                  <ChronicleItem
                    key={chronicle.id}
                    chronicle={chronicle}
                    chronicler={chronicler}
                  />
                );
              })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

function ChronicleItem({
  chronicle,
  chronicler,
}: {
  chronicle: Chronicle;
  chronicler: Chronicler;
}) {
  return (
    <div className="border-l-4 border-primary pl-4 py-2">
      <div className="flex items-center gap-3 mb-2">
        <CharacterDialog character={chronicler} />
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{chronicle.chronicler}</Badge>
          <span className="text-xs text-muted-foreground">
            {getDate(chronicle.turn)}
          </span>
        </div>
      </div>
      <p className="text-sm italic font-serif leading-relaxed">
        "{chronicle.entry}"
      </p>
    </div>
  );
}
