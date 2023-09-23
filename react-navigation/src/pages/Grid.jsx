// Grid.js
import React, { useState } from "react";
import styles from "./Grid.module.css";
import Modal from "./GridImg/Modal";

const Grid = ({ photos }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const openModal = (photoIndex) => {
    setSelectedPhotoIndex(photoIndex);
  };

  const closeModal = () => {
    setSelectedPhotoIndex(null);
  };

  const goToNext = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const goToPrev = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  return (
    <div>
      <h1>Our Gallery</h1>
      <div className={styles.container}>
        {Array.isArray(photos) && photos.length > 0 ? (
          photos.map(({ photo, _id }, index) => (
            <div key={_id} className={styles["grid-items"]}>
              <img
                src={`http://localhost:3001/uploads/${photo}`}
                alt="grid_img"
                onClick={() => openModal(index)}
              />
            </div>
          ))
        ) : (
          <p>No photos available.</p>
        )}
      </div>
      {selectedPhotoIndex !== null && (
        <Modal
          src={`http://localhost:3001/uploads/${photos[selectedPhotoIndex].photo}`}
          alt="grid_img"
          onClose={closeModal}
          onNext={goToNext}
          onPrev={goToPrev}
        />
      )}
    </div>
  );
};

export default Grid;
