import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, webFormatUrl, largeImageUrl, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(show => !show);
  };

  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        onClick={toggleModal}
        className={css.ImageGalleryItemImage}
        src={webFormatUrl}
        alt={tags}
      />

      {showModal && (
        <Modal onClose={toggleModal} image={largeImageUrl} alt={tags}>
          {/* <img src={largeImageUrl} alt={tags} /> */}
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webFormatUrl: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
