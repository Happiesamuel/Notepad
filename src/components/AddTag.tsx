import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { useFilterTag } from "@/context/FilterTagContext";

export default function AddTag() {
  const [val, setVal] = useState("");
  const { dispatch, tags } = useFilterTag();
  function handleSubmit() {
    if (!val) return;
    const obj = { title: val, id: tags.length + 1 };
    dispatch({ type: "newTag", payload: obj });
    setVal("");
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-current-2 text-xl">
        +
      </AlertDialogTrigger>
      <AlertDialogContent className="border-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-current-1 text-center">
            Add new tage to your tage list
          </AlertDialogTitle>
          <AlertDialogDescription className="text-current-2 pt-4">
            <div className="flex items-center gap-4">
              <Label className="text-current-3 text-right" htmlFor="title">
                Title
              </Label>
              <Input
                value={val}
                onChange={(e) => setVal(e.target.value)}
                id="title"
                placeholder="Enter your tag..."
                className="col-span-3 border-input-create text-current-2"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-zinc-100 bg-zinc-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleSubmit()}
            className="bg-blue-600 hover:bg-blue-700 text-zinc-100"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
