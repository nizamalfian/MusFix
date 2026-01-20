import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import albumApi from './api/album/index.js';
import songApi from './api/song/index.js';
import AlbumService from './services/postgres/AlbumService.js';
import AlbumValidator from './validator/album/index.js';
import SongService from './services/postgres/SongService.js';
import SongValidator from './validator/song/index.js';
import ClientError from './exceptions/ClientError.js';

const init = async () => {
    const songService = new SongService();
    const albumService = new AlbumService(songService);

    const app = express();

    app.use(cors());
    app.use(express.json());

    const albumRouter = albumApi({ service: albumService, validator: AlbumValidator });
    app.use(albumRouter);

    const songRouter = songApi({ service: songService, validator: SongValidator });
    app.use(songRouter);

    app.use((err, req, res, next) => {
        if (err instanceof ClientError) {
            return res.status(err.statusCode).json({
                status: 'fail',
                message: err.message,
            });
        }
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    });

    const port = process.env.PORT;
    const host = process.env.HOST;

    app.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}...`);
    });
};

init();

