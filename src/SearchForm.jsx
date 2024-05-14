import { useGlobalContext } from './context';

function SearchForm() {
  const { setSearchValue } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    let searchTerm = e.target.elements.search.value.toLowerCase();
    console.log(searchTerm);
    if (!searchTerm) return;
    setSearchValue(searchTerm);
    e.target.elements.search.value = '';
  };

  return (
    <section>
      <h1 className='title'>unsplash images</h1>
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='cat'
          name='search'
          className='form-input search-input'
        />
        <button className='btn'>search</button>
      </form>
    </section>
  );
}
export default SearchForm;
