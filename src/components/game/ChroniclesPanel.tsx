import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Chronicle, Chronicler } from "@/types/GameTypes";
import { getDate } from "@/data/gameData";

interface ChroniclesPanelProps {
  chronicles: Chronicle[];
  chroniclers: Chronicler[];
}

export const ChroniclesPanel: React.FC<ChroniclesPanelProps> = ({
  chronicles,
  chroniclers,
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
              .map((chronicle) => (
                <ChronicleItem
                  key={chronicle.id}
                  chronicle={chronicle}
                  chronicler={getChroniclerInfo(chronicle.chronicler)}
                />
              ))}
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
        {chronicler && <ChroniclerDialog chronicler={chronicler} />}
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

export function ChroniclerDialog({ chronicler }: { chronicler: Chronicler }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Avatar className="w-16 h-16 relative cursor-pointer">
          <AvatarImage src={chronicler.image} alt={chronicler.name} />
          <AvatarFallback className="text-xs">
            {chronicler?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="w-20 h-20">
              <AvatarImage src={chronicler?.image} alt={chronicler.name} />
              <AvatarFallback>{chronicler?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            {chronicler?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm leading-relaxed italic">
            {chronicler?.biography}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
