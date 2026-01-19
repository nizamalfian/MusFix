import express from 'express';

const createSongRouter = (songHandler) => {
    const router = express.Router();

    router.post('/songs', songHandler.postSongHandler);
    router.get('/songs', songHandler.getSongsHandler);
    router.get('/songs/:id', songHandler.getSongByIdHandler);
    router.put('/songs/:id', songHandler.putSongByIdHandler);
    router.delete('/songs/:id', songHandler.deleteSongByIdHandler);

    return router;
};

export default createSongRouter;