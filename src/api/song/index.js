import SongHandler from './handler.js';
import createSongRouter from './routes.js';

const songApi = ({ service, validator }) => {
    const songHandler = new SongHandler(service, validator);
    return createSongRouter(songHandler);
};

export default songApi;
