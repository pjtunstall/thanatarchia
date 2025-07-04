import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Territory } from '@/types/GameTypes';
import { MapPin, Users, Eye } from 'lucide-react';

interface SelectedTerritoryInfoProps {
  territory: Territory;
  playerFactionName: string;
}

const SelectedTerritoryInfo: React.FC<SelectedTerritoryInfoProps> = ({
  territory,
  playerFactionName,
}) => {
  const isPlayerTerritory = territory.owner === playerFactionName;
  const troopCount = territory.troops || territory.estimatedTroops || 0;

  return (
    <Card className="mt-4 border-primary/20 bg-muted/30">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{territory.name}</span>
            <Badge variant={isPlayerTerritory ? "default" : "secondary"} className="text-xs">
              {territory.owner}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">
              {isPlayerTerritory ? troopCount : (territory.spiedOn ? troopCount : '?')}
            </span>
            {!isPlayerTerritory && !territory.spiedOn && (
              <Eye className="w-3 h-3 text-muted-foreground/60" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectedTerritoryInfo;