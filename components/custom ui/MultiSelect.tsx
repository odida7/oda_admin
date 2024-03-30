"use client";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[] | undefined;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  console.log("collections:", collections);
  console.log("value:", value);

  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
 
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
/*
  const handleSelect = (collectionId: string) => {
    onChange(collectionId);
    setInputValue(""); 
    setOpen(false); 
  };

const handleSelect = (collectionId: string) => {
  const updatedValue: string[] = value ? [...value, collectionId] : [collectionId];
  onChange(updatedValue);
  setInputValue(""); // Clear input value after selection
  setOpen(false); // Close the dropdown after selection
};
*/

  return (
    
    <CommandDialog>
      <CommandInput
        placeholder={placeholder}
        value={inputValue}
        onValueChange={setInputValue}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
      />
      
        <CommandList>
          {collections.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {collections.length > 0 && (
            <CommandGroup >
              {collections.map((collection) => (
                <CommandItem
                  className="text-gray-800"
                  key={collection?._id}
                  onMouseDown={(e) => e.preventDefault()}
                  onSelect={() => onChange(collection._id)}
                >
                  {collection.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
    
    </CommandDialog>
  );
};

export default MultiSelect;
