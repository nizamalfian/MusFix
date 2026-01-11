const routes = (songHandler) => [
    {
        method: 'POST',
        path: '/songs',
        handler: songHandler.postSongsHandler,
    },
    {
        method: 'GET',
        path: '/songs',
        handler: songHandler.getSongsHandler,
    },
    {
        method: 'PUT',
        path: '/songs',
        handler: songHandler.putSongsHandler,
    },
    {
        method: 'DELETE',
        path: '/songs',
        handler: songHandler.deleteSongsByIdHandler,
    },
];

module.exports = routes;