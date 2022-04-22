import s from './ImageGalleryItem.module.css';
import PropTypes from "prop-types";

export default function ImageGalleryItem({ webImage, largeImage, tags, onClick, extract}) {
    return (
        <li className={s.ImageGalleryItem} onClick={() => {
            onClick();
            extract(largeImage);
        }}>
            <img className={s.ImageGalleryItemImage} src={webImage} alt={tags} width={250} />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    webImage: PropTypes.string,
    largeImage: PropTypes.string,
    tags: PropTypes.string,
    onClick: PropTypes.func,
    extract: PropTypes.func,
}