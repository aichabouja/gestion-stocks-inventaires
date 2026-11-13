import "./Searchbar.css";

function SearchBar({ placeholder, value, onChange }) {
  return (
    <input
      className="searchbar"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;