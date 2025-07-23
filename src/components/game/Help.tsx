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

const helpTopics = ["Thanatarchia", "Topic B"];
const helpContent: Record<string, string> = {
  Thanatarchia:
    "The year is 499. In the West, the Roman Empire is a patchwork of barbarian successor states. In the East, it lives on as Byzantium, still a force to be reckoned with. Who will survive? Who will triumph? What even is triumph anyway?",
  "Topic B": "Details about Topic B...",
};

export function Help() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
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
                // Actually give answers in the words of your adviser in the panel in place of the default.
                onSelect={() => {
                  setSelectedTopic(topic);
                  setOpen(true);
                }}
              >
                {topic}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {selectedTopic && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedTopic}</DialogTitle>
              <DialogDescription>
                <p>{helpContent[selectedTopic]}</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
