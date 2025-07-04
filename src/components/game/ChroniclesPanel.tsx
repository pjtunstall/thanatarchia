import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Chronicle } from '@/types/GameTypes';

interface ChroniclesPanelProps {
  chronicles: Chronicle[];
}

const ChroniclesPanel: React.FC<ChroniclesPanelProps> = ({ chronicles }) => {
  return (
    <Card className="h-[calc(100vh-200px)] bg-[hsl(var(--chronicle))]">
      <CardHeader>
        <CardTitle className="text-xl">Chronicles</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-4">
            {chronicles.map((chronicle) => (
              <div key={chronicle.id} className="border-l-4 border-primary pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={chronicle.bias === 'friendly' ? 'secondary' : 'destructive'}>
                    {chronicle.chronicler}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Turn {chronicle.turn}</span>
                </div>
                <p className="text-sm italic font-serif leading-relaxed">
                  "{chronicle.entry}"
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ChroniclesPanel;