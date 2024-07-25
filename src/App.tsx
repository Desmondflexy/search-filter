// People data generated from https://www.mockaroo.com/
import PEOPLE from './MOCK_DATA.json';
import { useState } from 'react';

interface IPerson {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    gender: string,
}

function App() {
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
        setCurrentPage(1);
    }

    const filteredPeople = PEOPLE.filter(person => {
        const search = searchValue.toLowerCase();
        if (!search.trim()) return true;
        const firstName = person.first_name.toLowerCase();
        const lastName = person.last_name.toLowerCase();
        const fullName = `${firstName} ${lastName}`;
        return (
            firstName.includes(search)
            || lastName.includes(search)
            || fullName.includes(search)
        );
    });

    const paginate = (data: IPerson[], currentPage: number, pageSize: number) => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = currentPage * pageSize;
        return {
            currentPage,
            pageSize,
            totalPages: Math.ceil(data.length / pageSize),
            data: data.slice(startIndex, endIndex),
        }
    }

    const paginatedResult = paginate(filteredPeople, currentPage, 20);

    const gotoPrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const gotoNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    let paginationButtonJsx = null;
    if (paginatedResult.totalPages > 1)
        paginationButtonJsx = (
            <div className="next-prev-btn">
                <button disabled={currentPage === 1} onClick={gotoPrevPage}>Prev Page</button>
                <span>Page {currentPage}/{paginatedResult.totalPages}</span>
                <button disabled={currentPage === paginatedResult.totalPages} onClick={gotoNextPage}>Next Page</button>
            </div>
        );

    return (
        <div className='App'>
            <h2>Search Filter ({filteredPeople.length})</h2>
            <input autoFocus type="search" placeholder='Search...' value={searchValue} onChange={handleChange} />
            {paginationButtonJsx}
            <ul>
                {filteredPeople.length ? paginatedResult.data.map(person => (
                    <li key={person.id}>{person.first_name} {person.last_name}</li>
                )) : (
                    <li className='no-result'>No results found</li>
                )}
            </ul>
            {paginationButtonJsx}
        </div>
    )
}

export default App
