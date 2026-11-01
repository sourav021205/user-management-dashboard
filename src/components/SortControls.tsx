import type { SortField } from "../utils/sortUsers.ts";

interface SortControlsProps {
  sortField: SortField;
  sortDirection: "asc" | "desc";
  onFieldChange: (value: SortField) => void;
  onDirectionChange: (value: "asc" | "desc") => void;
}

function SortControls({
  sortField,
  sortDirection,
  onFieldChange,
  onDirectionChange,
}: SortControlsProps) {
  return (
    <div className="filter-controls">
      <label>
        Sort By
        <select
          value={sortField}
          onChange={function (event) {
            onFieldChange(event.target.value as SortField);
          }}
        >
          <option value="name">Name</option>
          <option value="username">Username</option>
          <option value="email">Email</option>
        </select>
      </label>

      <label>
        Order
        <select
          value={sortDirection}
          onChange={function (event) {
            onDirectionChange(event.target.value as "asc" | "desc");
          }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
}

export default SortControls;
