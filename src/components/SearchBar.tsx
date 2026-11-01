import { TextField } from "@mui/material";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <TextField
      fullWidth
      size="small"
      label="Search Users"
      placeholder="Search name, username or email"
      value={searchTerm}
      onChange={function (event) {
        onSearchChange(event.target.value);
      }}
    />
  );
}

export default SearchBar;
