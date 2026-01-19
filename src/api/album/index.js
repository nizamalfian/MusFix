import AlbumHandler from './handler.js';
import createAlbumRouter from './routes.js';

const albumApi = ({ service, validator }) => {
    const albumHandler = new AlbumHandler(service, validator);
    return createAlbumRouter(albumHandler);
};

export default albumApi;
