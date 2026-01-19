import express from 'express';

const createAlbumRouter = (albumHandler) => {
    const router = express.Router();

    router.post('/albums', albumHandler.postAlbumHandler);
    router.get('/albums', albumHandler.getAlbumsHandler);
    router.get('/albums/:id', albumHandler.getAlbumByIdHandler);
    router.put('/albums/:id', albumHandler.putAlbumByIdHandler);
    router.delete('/albums/:id', albumHandler.deleteAlbumByIdHandler);

    return router;
};

export default createAlbumRouter;
