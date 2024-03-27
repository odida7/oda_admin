import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
}) => {
  console.log('collections:', collections);

  const handleSelectChange = (selectedItems: string[]) => {
    onChange(selectedItems);
  };

  return (
    <div className="overflow-visible bg-white">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {collections.map(collection => (
            <SelectItem 
              key={collection._id} 
              value={collection._id} 
              isSelected={value.includes(collection._id)}
              onClick={() => {
                const selectedValues = value.includes(collection._id)
                  ? value.filter(item => item !== collection._id)
                  : [...value, collection._id];
                handleSelectChange(selectedValues);
              }}
            >
              {collection.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MultiSelect;
