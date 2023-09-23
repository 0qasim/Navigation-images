// Modal.js
import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ src, alt, onClose, onNext, onPrev }) => {
  return (
    <div className={styles.modal} >
      <div  className={styles.closeButton} onClick={onClose}>
        <img src="./images/close.png" alt="Close"/>
        Close
      </div>
      <div 
        className={styles.prevButton} onClick={onPrev}>
      </div>
      <div className={styles.nextButton} onClick={onNext} >
      </div>
      <div className={styles.fullScreenImage}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
