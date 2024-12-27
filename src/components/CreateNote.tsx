import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useFilterTag } from "@/context/FilterTagContext";
import { date } from "@/lib/utils";
import { X } from "lucide-react";

export function CreateNote({
  children,
  isOpen,
  setIsOpen,
}: {
  children: ReactElement;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { tags, notes, dispatch } = useFilterTag();
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [val, setVal] = useState("");
  function handleSubmit() {
    if (!val || !selectedTag.length) return;
    else
      dispatch({
        type: "createNoteObj",
        payload: {
          title: val,
          tags: selectedTag,
          id: notes.length + 1,
          date: date(),
          description: [],
          archive: false,
        },
      });
    setSelectedTag([]);
    setIsOpen(false);
  }
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-none">
        <div
          onClick={() => setIsOpen(false)}
          className="text-current-1 cursor-pointer absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </div>
        <DialogHeader>
          <DialogTitle className="text-current-1">Create New Note</DialogTitle>
          <DialogDescription className="text-current-3">
            Enter your note title and make your tags to filter notes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-current-3 text-right" htmlFor="title">
              Title
            </Label>
            <Input
              onChange={(e) => setVal(e.target.value)}
              id="title"
              placeholder="Enter your note title..."
              className="col-span-3 border-input-create text-current-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-current-3 text-right" htmlFor="title">
              Tags
            </Label>
            <Select
              onValueChange={(value) => {
                setSelectedTag((i) =>
                  i.some((i) => i === value) ? [...i] : [...i, value]
                );
              }}
            >
              <SelectTrigger className="col-span-3 border-input-create text-current-2">
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent className="bg-background h-[200px]">
                {tags
                  .filter((x) => x.title !== "All Tags")
                  .map((tag) => (
                    <SelectItem
                      key={tag.id}
                      className="hover:bg-active cursor-pointer text-current-2"
                      value={tag.title}
                    >
                      {tag.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {selectedTag.length ? (
          <div className="flex flex-wrap text-xs mx-2 gap-1">
            {selectedTag.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-active gap-1 cursor-pointer p-1 rounded-md text-current-2"
              >
                <FaRegTrashCan
                  onClick={() =>
                    setSelectedTag((i) => i.filter((x) => x !== tag))
                  }
                />
                <p>{tag}</p>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <DialogFooter>
          <Button
            onClick={() => handleSubmit()}
            type="submit"
            className="hover:bg-blue-600 bg-blue-700 text-zinc-100"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
