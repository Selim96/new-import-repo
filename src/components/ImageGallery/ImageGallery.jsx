import React, { Component } from "react";
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

class ImageGallery extends Component {
    state = {
        images: [],
        totalHits: '',
        per_page: 12,
        status: 'idele',
        error: '',
        showModal: false,
        imageURL: '',
        onMore: false,
    }
    
    static propTypes = {
        imageName: PropTypes.string,
    }

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.imageName;
        const currentName = this.props.imageName;

        if (prevName !== currentName) {
            this.setState({ status: 'pending', });

            api.query = currentName;
            api.page = 1;
            api.per_page = this.state.per_page;
            api.fetchImages().then(respObj => {
                    if (respObj.hits.length === 0) {
                        return Promise.reject(new Error(`We can't find ${currentName}!`));
                    }
                this.setState({ status: 'resolved', images: respObj.hits, totalHits: respObj.totalHits });
                }).catch(error => {
                    this.errorFunc(error);
                    this.setState({ error, status: 'rejected', })
                });
        }
    }

    onLoadMore = () => {
        this.setState({ onMore: true });
        api.pageIncrise();
        api.fetchImages().then(respObj => {
            this.setState(prev => ({
                images: [...prev.images, ...respObj.hits],
                onMore: false,
            }));
        });
    }

    modalShowClose = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    }

    extractUrl = (imageURL) => {
        this.setState({ imageURL });
    }

    errorFunc = (error) => {
        toast.error(`${error.message}`);
        return;
    }

    render() {
        const {images, status, showModal, imageURL, totalHits, onMore} = this.state;

        if (status === 'idele') {
            return <div></div>
        };

        if (status === 'pending') {
            return <Loader/>;
        };

        if (status === 'rejected') {
            return <ErrorPic />;
        };

        if (status === 'resolved') {
            return <>
                <ul className={s.ImageGallery}>
                    {images.map(({ id, webformatURL, tags, largeImageURL, }) => {
                        return (
                            <ImageGalleryItem key={id} webImage={webformatURL} largeImage={largeImageURL} tags={tags} onClick={this.modalShowClose} extract={this.extractUrl} />
                        );
                    })}
                </ul>
                {onMore && <Loader />}
                {totalHits > images.length && !onMore && <Button onClick={this.onLoadMore} />}
                {showModal && <Modal onClose={this.modalShowClose}>
                    <img src={imageURL} alt="" className="" />
                </Modal>}
            </>
        }
    }
}

export default ImageGallery;