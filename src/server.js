import 'dotenv/config';
import Hapi from '@hapi/hapi';
import album from './api/album/index.js';
import song from './api/song/index.js';
import AlbumService from './services/postgres/AlbumService.js';
import AlbumValidator from './validator/album/index.js';
import SongService from './services/postgres/SongService.js';
import SongValidator from './validator/song/index.js';
import ClientError from './exceptions/ClientError.js';

const init = async () => {
    const songService = new SongService();
    const albumService = new AlbumService(songService);

    const server = Hapi.server(
        {
            port: process.env.PORT,
            host: process.env.HOST,
            routes: {
                cors: {
                    origin: ['*'],
                }
            }
        }
    );

    await server.register(
        [
            {
                plugin: album,
                options: {
                    service: albumService,
                    validator: AlbumValidator,
                }
            },
            {
                plugin: song,
                options: {
                    service: songService,
                    validator: SongValidator,
                }
            },
        ]
    );

    server.ext(
        'onPreResponse',
        (request, h) => {
            const { response } = request;

            if (response instanceof ClientError) {
                const newResponse = h.response(
                    {
                        status: 'fail',
                        message: response.message,
                    }
                )
                newResponse.code(response.statusCode);
                return newResponse;
            }

            return h.continue;
        }
    );

    await server.start();
    console.log(`Server is running on ${server.info.uri}...`);
};

init();
