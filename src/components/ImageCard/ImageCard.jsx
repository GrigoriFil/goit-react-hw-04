import css from './ImageCard.module.css';

function ImageCard({ imageUrl, altText, onClick }) {
    return (
        <div className={css.card} onClick={onClick}>
            <img className={css.image} src={imageUrl} alt={altText} width="300" />
        </div>
    );
}

export default ImageCard;