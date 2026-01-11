const routes = (albumHandler) => [
    {
        method: 'POST',
        path: '/albums',
        handler: albumHandler.postAlbumHandler,
    },
    {
        method: 'GET',
        path: '/albums',
        handler: albumHandler.getAlbumsHandler,
    },
    {
        method: 'PUT',
        path: '/albums',
        handler: albumHandler.putAlbumByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/albums',
        handler: albumHandler.deleteAlbumByIdHandler,
    },
];

module.exports = routes;