import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Character, ChatEntry } from "@/types/gameTypes";
import { CharacterDialog } from "@/components/game/CharacterProfile";

export function ChatPanel({ chat }: { chat: ChatEntry[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Chronicles</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh)]">
          <div className="space-y-4">
            {chat
              .slice()
              .reverse()
              .map((chatEntry) => {
                return (
                  <ChatEntryComponent
                    key={chat.indexOf(chatEntry)}
                    author={chatEntry.author}
                    date={chatEntry.date}
                    statement={chatEntry.statement}
                  />
                );
              })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

type ChatEntryComponentProps = {
  author: Character;
  date: string;
  statement: string;
};

function ChatEntryComponent({
  author,
  date,
  statement,
}: ChatEntryComponentProps) {
  return (
    <div className="border-l-4 border-primary pl-4 py-2">
      <div className="flex items-center gap-3 mb-2">
        <CharacterDialog character={author} />
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{author.name}</Badge>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </div>
      <p className="text-sm italic font-serif leading-relaxed">"{statement}"</p>
    </div>
  );
}
