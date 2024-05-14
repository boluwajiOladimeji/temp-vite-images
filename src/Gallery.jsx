import { useQuery } from '@tanstack/react-query';
import { useGlobalContext } from './context';
import axios from 'axios';

const url = `https://api.unsplash.com/search/photos/?client_id=${
  import.meta.env.VITE_API_KEY
}`;

function Gallery() {
  const { searchValue } = useGlobalContext();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['images', searchValue],
    queryFn: async () => {
      const { data } = await axios(`${url}&query=${searchValue}`);

      return data;
    },
  });

  if (isLoading) {
    return (
      <section className='image-container'>
        <h4>Loading ...</h4>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='image-container'>
        <h4>There was an error</h4>
      </section>
    );
  }

  const result = data.results;

  if (result.length < 1) {
    return (
      <section className='image-container'>
        <h4>No results Found.</h4>
      </section>
    );
  }

  return (
    <section className='image-container'>
      {result.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_description}
            className='img'
          />
        );
      })}
    </section>
  );
}
export default Gallery;
