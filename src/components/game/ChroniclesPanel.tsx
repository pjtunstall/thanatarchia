import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Chronicle, Chronicler } from '@/types/GameTypes';

interface ChroniclesPanelProps {
  chronicles: Chronicle[];
  chroniclers: Chronicler[];
}

const ChroniclesPanel: React.FC<ChroniclesPanelProps> = ({ chronicles, chroniclers }) => {
  const getChroniclerInfo = (chroniclerName: string) => {
    return chroniclers.find(c => c.name === chroniclerName);
  };
  return (
    <Card className="h-[calc(100vh-200px)] bg-[hsl(var(--chronicle))]">
      <CardHeader>
        <CardTitle className="text-xl">Chronicles</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-4">
            {chronicles.map((chronicle) => {
              const chroniclerInfo = getChroniclerInfo(chronicle.chronicler);
              return (
                <div key={chronicle.id} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex items-center gap-3 mb-2">
                    {chroniclerInfo && (
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
                    )}
                    <div className="flex items-center gap-2">
                      <Badge variant={chronicle.bias === 'friendly' ? 'secondary' : 'destructive'}>
                        {chronicle.chronicler}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Turn {chronicle.turn}</span>
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