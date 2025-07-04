import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { HistoricalFaction } from '@/types/GameTypes';
import { Crown, Users, Church } from 'lucide-react';

interface FactionDetailsProps {
  faction: HistoricalFaction;
  isPlayerFaction?: boolean;
}

const FactionDetails: React.FC<FactionDetailsProps> = ({ faction, isPlayerFaction = false }) => {
  const getHeresyColor = (heresy: string) => {
    switch (heresy) {
      case 'Orthodox': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Arian': return 'bg-red-100 text-red-800 border-red-200';
      case 'Filioque': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Heathen': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Manichean': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="w-80 parchment-texture">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-16 h-16 border-2 border-primary/20">
            <AvatarImage 
              src={faction.leader.portrait} 
              alt={`${faction.leader.name} portrait`}
              className="object-cover"
            />
            <AvatarFallback className="text-lg font-bold">
              {faction.leader.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {isPlayerFaction && <Crown className="w-4 h-4 text-yellow-500" />}
              {faction.displayName}
            </CardTitle>
            <p className="text-sm text-muted-foreground font-medium">
              {faction.leader.name}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Heresy/Religion */}
        <div className="flex items-center gap-2">
          <Church className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Faith:</span>
          <Badge 
            variant="outline" 
            className={`${getHeresyColor(faction.heresy)} text-xs`}
          >
            {faction.heresy}
          </Badge>
        </div>

        <Separator />

        {/* Relatives */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Available Relatives:</span>
          </div>
          <div className="space-y-1">
            {faction.relatives.map((relative, index) => (
              <div 
                key={index}
                className="flex items-center justify-between text-xs bg-muted/30 rounded px-2 py-1"
              >
                <span>{relative}</span>
                <Badge variant="secondary" className="text-xs">
                  Available
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {isPlayerFaction && (
          <>
            <Separator />
            <div className="text-xs text-center text-muted-foreground italic">
              This is your faction
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FactionDetails;