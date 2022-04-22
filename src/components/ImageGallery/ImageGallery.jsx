import React, { useState, useEffect, } from "react";
import ImagesApi from '../Api/Api';
import s from './ImageGallery.module.css';
import { toast } from 'react-toastify';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import ErrorPic from "components/Error";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";
import PropTypes from "prop-types";

const api = new ImagesApi();

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLWED: 'resolwed',
    REJECTED: 'rejected',
}

function ImageGallery({imageName}) {
    const [images, setImages] = useState([]);
    const [totalHits, setTotalHits] = useState('');
    const [per_page, setPer_page] = useState(12);
    const [status, setStatus] = useState(Status.IDLE);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [imageURL, setImageURL] = useState('');
    const [loaderOn, setLoaderOn] = useState(false);
    
    api.query = imageName;

    useEffect(() => {
        if (imageName === '') {
            return;
        }
        console.log('RUN UPDATE!!!!!!')
        setStatus(Status.PENDING);
        setLoaderOn(true);
    
        api.page = 1;
        api.per_page = per_page;
        api.fetchImages().
            then(respObj => {
                if (respObj.hits.length === 0) {
                    return Promise.reject(new Error(`We can't find ${imageName}!`));
                }
                setStatus(Status.RESOLWED);
                setLoaderOn(false);
                setImages(respObj.hits);
                setTotalHits(respObj.totalHits);
            }).
            catch(error => {
                errorFunc(error);
                setError(error);
                setStatus(Status.REJECTED);
            });
    }, [imageName]);

    const onLoadMore = () => {
        setLoaderOn(true);
        
        api.pageIncrise();
        api.fetchImages().then(respObj => {
            setImages(prev => [...prev, ...respObj.hits]);
            setLoaderOn(false);
        });
    }
    
    const modalShowClose = () => {
        setShowModal(prev => !prev);
    }
    
    const extractUrl = (imageURL) => {
        setImageURL(imageURL);
    }
    
    function errorFunc(error) {
        toast.error(`${error.message}`);
        return;
    }

    if (status === Status.IDLE) {
            return <div></div>
        };

        // if (status === Status.PENDING) {
        //     return <Loader/>;
        // };

        if (status === Status.REJECTED) {
            return <ErrorPic />;
        };

        if (status === Status.RESOLWED || status === Status.PENDING) {
            return <>
                <ul className={s.ImageGallery}>
                    {images.map(({ id, webformatURL, tags, largeImageURL, }) => {
                        return (
                            <ImageGalleryItem key={id} webImage={webformatURL} largeImage={largeImageURL} tags={tags} onClick={modalShowClose} extract={extractUrl} />
                        );
                    })}
                </ul>
                {loaderOn && <Loader />}
                {totalHits > images.length && !loaderOn && <Button onClick={onLoadMore} />}
                {showModal && <Modal onClose={modalShowClose}>
                    <img src={imageURL} alt="" className="" />
                </Modal>}
            </>
        }
}

ImageGallery.propTypes = {
        imageName: PropTypes.string,
    }

// ============================================
// class ImageGallery extends Component {
//     state = {
//         images: [],
//         totalHits: '',
//         per_page: 12,
//         status: 'idele',
//         error: '',
//         showModal: false,
//         imageURL: '',
//         onMore: false,
//     }
    
//     static propTypes = {
//         imageName: PropTypes.string,
//     }

//     componentDidUpdate(prevProps, prevState) {
//         const prevName = prevProps.imageName;
//         const currentName = this.props.imageName;
//         console.log('дид апдейт запустился!!')

//         if (prevName !== currentName) {
//             this.setState({ status: 'pending', });

//             api.query = currentName;
//             api.page = 1;
//             api.per_page = this.state.per_page;
//             api.fetchImages().then(respObj => {
//                     if (respObj.hits.length === 0) {
//                         return Promise.reject(new Error(`We can't find ${currentName}!`));
//                     }
//                 this.setState({ status: 'resolved', images: respObj.hits, totalHits: respObj.totalHits });
//                 }).catch(error => {
//                     this.errorFunc(error);
//                     this.setState({ error, status: 'rejected', })
//                 });
//         }
//     }

//     onLoadMore = () => {
//         this.setState({ onMore: true });
//         api.pageIncrise();
//         api.fetchImages().then(respObj => {
//             this.setState(prev => ({
//                 images: [...prev.images, ...respObj.hits],
//                 onMore: false,
//             }));
//         });
//     }

//     modalShowClose = () => {
//         this.setState(({ showModal }) => ({
//             showModal: !showModal,
//         }));
//     }

//     extractUrl = (imageURL) => {
//         this.setState({ imageURL });
//     }

//     errorFunc = (error) => {
//         toast.error(`${error.message}`);
//         return;
//     }

//     render() {
//         const {images, status, showModal, imageURL, totalHits, onMore} = this.state;

//         if (status === 'idele') {
//             return <div></div>
//         };

//         if (status === 'pending') {
//             return <Loader/>;
//         };

//         if (status === 'rejected') {
//             return <ErrorPic />;
//         };

//         if (status === 'resolved') {
//             return <>
//                 <ul className={s.ImageGallery}>
//                     {images.map(({ id, webformatURL, tags, largeImageURL, }) => {
//                         return (
//                             <ImageGalleryItem key={id} webImage={webformatURL} largeImage={largeImageURL} tags={tags} onClick={this.modalShowClose} extract={this.extractUrl} />
//                         );
//                     })}
//                 </ul>
//                 {onMore && <Loader />}
//                 {totalHits > images.length && !onMore && <Button onClick={this.onLoadMore} />}
//                 {showModal && <Modal onClose={this.modalShowClose}>
//                     <img src={imageURL} alt="" className="" />
//                 </Modal>}
//             </>
//         }
//     }
// }

export default ImageGallery;