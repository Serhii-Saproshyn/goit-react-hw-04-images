import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallerty } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';

const API_KEY = '34300541-9ea07d11e1c55e84f488b0732';
const BASE_URL = `https://pixabay.com/api/`;

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (searchName) {
      const fetch = async () => {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}?q=${searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        const totalHits = await response.data.totalHits;
        setTotalImages(totalHits);
        if (response.data.hits.length < 12 && response.data.hits.length > 0) {
          toast.info('You have seen all the pictures');
        }
        if (response.data.hits.length === 0) {
          toast.error('Sorry, we did not find any images for your request :(');
        } else {
          setData(prevData => [
            ...prevData,
            ...normalaziedData(response.data.hits),
          ]);
        }
        setLoading(false);
      };
      fetch();
    }
  }, [searchName, page]);

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
    setData([]);
    setPage(1);
  };

  const normalaziedData = arr => {
    return arr.map(({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }));
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <Loader />}
      {data.length !== 0 && <ImageGallerty data={data} />}
      {data.length !== 0 && data.length < totalImages && (
        <Button onClick={loadMore} />
      )}
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  );
};
