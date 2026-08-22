import { Search } from "lucide-react";

import { Input } from "@/shared/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-[720px]">
      <Search className="pointer-events-none absolute top-1/2 left-4 size-[19px] -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search movies and TV shows…"
        className="h-13 pl-11 text-base"
      />
    </div>
  );
}
