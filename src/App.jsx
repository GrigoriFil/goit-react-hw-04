import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Modal from 'react-modal';
import { fetchImages } from './services/unsplash-api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

Modal.setAppElement('#root');

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const getImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);

        if (data.results.length === 0) {
           toast.error('No images found for your query.');
        }

        setImages(prevImages => [...prevImages, ...data.results]);
        setTotalPages(data.totalPages);

      } catch (err) {
        setError(err.message || 'Something went wrong!');
        toast.error(`Error: ${err.message || 'Something went wrong!'}`);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    if (newQuery === query) {
      toast('You are already viewing results for this query.');
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalPages(0);
    setError(null);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const openModal = (image) => {
      setSelectedImage(image);
      setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  }
  const showLoadMore = images.length > 0 && page < totalPages && !isLoading;

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster position="top-right" reverseOrder={false} />

      {error && <ErrorMessage message={error} />}

      {images.length > 0 && <ImageGallery items={images} onImageClick={openModal} />}

      {isLoading && <Loader />}

      {showLoadMore && <LoadMoreBtn onClick={handleLoadMore} />}

      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageData={selectedImage}
      />
    </>
  );
}

  export default App;