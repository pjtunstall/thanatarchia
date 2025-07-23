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

const helpTopics = ["Topic A", "Topic B"];
const helpContent: Record<string, { image: string; text: string }> = {
  "Topic A": {
    image: "/images/topic-a.png",
    text: "Details about Topic A...",
  },
  "Topic B": {
    image: "/images/topic-b.png",
    text: "Details about Topic B...",
  },
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
                <img
                  src={helpContent[selectedTopic].image}
                  alt={selectedTopic}
                  className="mb-4 max-h-48 w-full object-contain"
                />
                <p>{helpContent[selectedTopic].text}</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
