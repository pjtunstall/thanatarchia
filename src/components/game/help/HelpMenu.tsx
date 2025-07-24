import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BookOpenText } from "lucide-react";
import { useState } from "react";

type HelpMenuProps = {
  onSelectTopic: (topic: string) => void;
};

export function HelpMenu({ onSelectTopic }: HelpMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <BookOpenText className="w-3 h-3 mr-1" />
              Ask about...
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {helpTopics.map((topic) => (
              <DropdownMenuItem
                key={topic}
                onSelect={() => {
                  onSelectTopic(topic);
                  setOpen(true);
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

const helpTopics = ["Thanatarchia", "Topic B"];
const helpContent: Record<string, string> = {
  Thanatarchia:
    "The year is 499. In the West, the Roman Empire is a patchwork of barbarian successor states. In the East, it lives on as Byzantium, still a force to be reckoned with. Who will survive? Who will triumph? What even is triumph anyway?",
  "Topic B": "Details about Topic B...",
};
