import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GameStatus } from '@/types/GameTypes';

interface GameOverlayProps {
  gameStatus: GameStatus;
  onResetGame: () => void;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ gameStatus, onResetGame }) => {
  if (gameStatus === 'playing') return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-96 p-6 text-center">
        <CardHeader>
          <CardTitle className={`text-3xl ${gameStatus === 'victory' ? 'text-green-600' : 'text-red-600'}`}>
            {gameStatus === 'victory' ? 'VICTORY!' : 'DEFEAT!'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            {gameStatus === 'victory' 
              ? 'Your barbarian confederation has conquered the known world!' 
              : 'Your faction has been eliminated from the struggle for power.'}
          </p>
          <Button onClick={onResetGame} size="lg">
            Play Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameOverlay;