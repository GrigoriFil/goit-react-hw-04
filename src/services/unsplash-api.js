import axios from 'axios';

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers.common['Authorization'] = `Client-ID ${ACCESS_KEY}`;


export const fetchImages = async (query, page = 1, perPage = 12) => {
  try {
    const response = await axios.get('/search/photos', {
      params: {
        query: query,
        page: page,
        per_page: perPage,
        orientation: 'landscape',
      },
    });

    return {
      results: response.data.results,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    throw new Error(error.response?.data?.errors?.[0] || 'Failed to fetch images');
  }
};