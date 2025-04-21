import Modal from 'react-modal';
import css from './ImageModal.module.css';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    background: 'none',
    padding: 0,
    overflow: 'visible',
  },
};

function ImageModal({ isOpen, onRequestClose, imageData }) {
  if (!imageData) {
      return (
         <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Image Modal"
         >
         </Modal>
      );
  }

  const { urls, alt_description, user, likes, description } = imageData;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <div className={css.modalContent}>
        <img
          className={css.modalImage}
          src={urls.regular}
          alt={alt_description || 'Large image'}
        />
        <div className={css.imageInfo}>
          {description && <p><strong>Description:</strong> {description}</p>}
          {user && <p><strong>Author:</strong> {user.name} (@{user.username})</p>}
          {likes !== null && <p><strong>Likes:</strong> {likes}</p>}
        </div>
      </div>
    </Modal>
  );
}

export default ImageModal;