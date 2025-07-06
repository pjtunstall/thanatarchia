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
import { getDate } from "@/data/GameData";

interface ChroniclesPanelProps {
  chronicles: Chronicle[];
  chroniclers: Chronicler[];
}

const ChroniclesPanel: React.FC<ChroniclesPanelProps> = ({
  chronicles,
  chroniclers,
}) => {
  const [selectedChronicler, setSelectedChronicler] =
    useState<Chronicler | null>(null);

  const getChroniclerInfo = (chroniclerName: string) => {
    return chroniclers.find((c) => c.name === chroniclerName);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Chronicles</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh)]">
          <div className="space-y-4">
            {chronicles.map((chronicle) => {
              const chroniclerInfo = getChroniclerInfo(chronicle.chronicler);
              return (
                <div
                  key={chronicle.id}
                  className="border-l-4 border-primary pl-4 py-2"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {chroniclerInfo && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Avatar className="w-8 h-8 transition-transform duration-200 hover:scale-150 hover:z-10 relative cursor-pointer">
                            <AvatarImage
                              src={chroniclerInfo.portrait}
                              alt={chroniclerInfo.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="text-xs">
                              {chroniclerInfo.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                              <Avatar className="w-12 h-12">
                                <AvatarImage
                                  src={chroniclerInfo.portrait}
                                  alt={chroniclerInfo.name}
                                  className="object-cover"
                                />
                                <AvatarFallback>
                                  {chroniclerInfo.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              {chroniclerInfo.name}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  chroniclerInfo.bias === "friendly"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {chroniclerInfo.bias}
                              </Badge>
                              <Badge variant="outline">
                                {chroniclerInfo.style}
                              </Badge>
                            </div>
                            <p className="text-sm leading-relaxed italic">
                              {chroniclerInfo.biography}
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    <div className="flex items-center gap-2">
                      <Badge variant={"secondary"}>
                        {chronicle.chronicler}
                      </Badge>
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
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ChroniclesPanel;
