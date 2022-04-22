class ImagesApi {
    #url = 'https://pixabay.com/api/?';
    #apiKey = '25806366-bb151d617166a7ad647d002f5';
    #page = 1;
    #per_page = 12;
    
    constructor() {
        this.imageName = '';
    }

    fetchImages() {
        return fetch(`${this.#url}q=${this.imageName}&page=${this.#page}&key=${this.#apiKey}&image_type=photo&orientation=horizontal&per_page=${this.#per_page}`).then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Something go wrong!`));
                });
    }

    get query() {
        return this.imageName;
    }

    set query(newImage) {
        this.imageName = newImage;
    }

    get page() {
        return this.#page;
    }

    set page(num) {
        this.#page = num;
    }

    pageIncrise() {
        this.#page = this.#page += 1;
    }

    get perPage() {
        return this.#per_page;
    }

    set perPage(num) {
        this.#per_page = num;
    }
}

export default ImagesApi;