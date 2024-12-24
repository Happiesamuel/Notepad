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
import { ReactElement, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useFilterTag } from "@/context/FilterTagContext";

export function CreateNote({ children }: { children: ReactElement }) {
  const { setNotes, tags } = useFilterTag();
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [val, setVal] = useState("");
  function handleSubmit() {
    if (!val || !selectedTag.length) return;
    else
      setNotes((i) => [
        ...i,
        {
          title: val,
          tags: selectedTag,
          id: Math.random() * 50,
          date: "29 Oct 2024",
          archive: false,
        },
      ]);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-none">
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