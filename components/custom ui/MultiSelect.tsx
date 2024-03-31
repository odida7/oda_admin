"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  return (
    <Select onValueChange={onChange}>
      
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      
      <SelectContent>
        {collections.map((collection)=>(
          <SelectItem
            className="text-gray-800"
            key={collection?._id}
            value={collection?._id}
            onMouseDown={(e) => e.preventDefault()}
          >
            {collection?.title}
          </SelectItem>
        ))}
       
      </SelectContent>
    </Select>
  );
};

export default MultiSelect;
