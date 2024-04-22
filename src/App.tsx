import './App.css';
import PEOPLE from './MOCK_DATA.json';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [people, setPeople] = useState(PEOPLE);

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = evt.target.value;
    setSearchTerm(searchTerm);
    setPeople(PEOPLE.filter(person => {
      const fullName = `${person.first_name} ${person.last_name}`;
      const searchpool = [
        fullName,
      ];
      return searchpool.some(name => name.toLowerCase().includes(searchTerm.toLowerCase()));
    }));
  }

  return (
    <>
      <div className='App'>
        <h2>Search Filter ({people.length})</h2>
        <input autoFocus type="search" placeholder='Search...' value={searchTerm} onChange={handleSearch} />
        <ul>
          {people.map(person => (
            <li key={person.id}>{person.first_name} {person.last_name}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
