class AlbumHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postAlbumHandler = this.postAlbumHandler.bind(this);
        this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
        this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
        this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
        this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    }

    async postAlbumHandler(req, res, next) {
        try {
            this._validator.validateAlbumPayload(req.body);
            const { name, year } = req.body;

            const albumId = await this._service.addAlbum({ name, year });

            res.status(201).json(
                {
                    status: 'success',
                    data: {
                        albumId: albumId
                    }
                }
            );
        } catch (error) {
            next(error);
        }
    }

    async getAlbumsHandler(req, res, next) {
        try {
            const albums = await this._service.getAlbums();
            res.status(200).json(
                {
                    status: 'success',
                    data: {
                        album: albums
                    }
                }
            );
        } catch (error) {
            next(error);
        }
    }

    async getAlbumByIdHandler(req, res, next) {
        try {
            const { id } = req.params;
            const album = await this._service.getAlbumById(id);
            res.status(200).json(
                {
                    status: 'success',
                    data: {
                        album: album
                    }
                }
            );
        } catch (error) {
            next(error);
        }
    }

    async putAlbumByIdHandler(req, res, next) {
        try {
            this._validator.validateAlbumPayload(req.body);
            const { id } = req.params;
            await this._service.editAlbumById(id, req.body);
            res.status(200).json(
                {
                    status: 'success',
                    message: 'Successfully updated album'
                }
            );
        } catch (error) {
            next(error);
        }
    }

    async deleteAlbumByIdHandler(req, res, next) {
        try {
            const { id } = req.params;
            await this._service.deleteAlbumById(id);
            res.status(200).json(
                {
                    status: 'success',
                    message: 'Successfully deleted album'
                }
            );
        } catch (error) {
            next(error);
        }
    }
}

export default AlbumHandler;

