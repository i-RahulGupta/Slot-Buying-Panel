import SearchBar from '../SearchBar';

export default function SearchBarExample() {
  return (
    <div className="w-80">
      <SearchBar
        placeholder="Search slots, buyers, orders..."
        onSearch={(q) => console.log('Searching:', q)}
      />
    </div>
  );
}
