import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

function ImageGallery({ items, onImageClick }) {
    if (!items || items.length === 0) {
        return null;
    }
    return (
        <ul className={css.gallery}>
            
            {items.map((item) => (
                <li key={item.id} className={css.galleryItem}>
                    <ImageCard
                        imageUrl={item.urls.small}
                        altText={item.alt_description || 'Image'}
                        onClick={() => onImageClick(item)}
                    />
                </li>
            ))}
        </ul>
    );
}

export default ImageGallery;