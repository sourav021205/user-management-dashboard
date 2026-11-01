interface FilterBarProps {
  cities: string[];
  companies: string[];
  cityFilter: string;
  companyFilter: string;
  onCityChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
}

function FilterBar({
  cities,
  companies,
  cityFilter,
  companyFilter,
  onCityChange,
  onCompanyChange,
}: FilterBarProps) {
  return (
    <div className="filter-controls">
      <label>
        City
        <select
          value={cityFilter}
          onChange={function (event) {
            onCityChange(event.target.value);
          }}
        >
          <option value="All">All Cities</option>

          {cities.map(function (city) {
            return (
              <option key={city} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </label>

      <label>
        Company
        <select
          value={companyFilter}
          onChange={function (event) {
            onCompanyChange(event.target.value);
          }}
        >
          <option value="All">All Companies</option>

          {companies.map(function (company) {
            return (
              <option key={company} value={company}>
                {company}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}

export default FilterBar;
