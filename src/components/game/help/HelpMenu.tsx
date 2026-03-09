import { useEffect, useState } from "react";
import { BookOpenText } from "lucide-react";

import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type HelpMenuProps = {
  onSelectTopic: (topic: string) => void;
};

export function HelpMenu({ onSelectTopic }: HelpMenuProps) {
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);

  useEffect(() => {
    const handleOpenRequest = () => {
      setIsHelpMenuOpen(true);
      console.log("handleOpenRequest");
    };

    window.addEventListener("open-help-menu", handleOpenRequest, true);

    return () => {
      window.removeEventListener("open-help-menu", handleOpenRequest);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <Dialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
        <DropdownMenu open={isHelpMenuOpen} onOpenChange={setIsHelpMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button id="help-ask-about-trigger" variant="outline" size="sm">
              <BookOpenText className="w-3 h-3 mr-1" />
              Ask About...
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {helpTopics.map((topic) => (
              <DropdownMenuItem
                key={topic}
                onSelect={() => {
                  onSelectTopic(topic);
                  setIsHelpDialogOpen(true);
                }}
              >
                {topic}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>
    </div>
  );
}

const helpTopics = [
  "Strategy",
  "Loyalty",
  "Robbery",
  "History",
  "Identity",
  "Choice",
  "War",
  "Thanatarchia",
  "How to Play",
];
