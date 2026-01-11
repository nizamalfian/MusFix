class SongHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

    async postSongHandler(request, h) {
        this._validator.validateSongPayload(request.payload);

        const songId = await this._service.addSong(request.payload);

        const response = await h.response(
            {
                status: 'success',
                data: {
                    song_id: songId
                }
            }
        )
        response.code(201);
        return response;
    }

    async getSongsHandler(request, h) {
        const songs = await this._service.getSongs();
        const response = h.response(
            {
                status: 'success',
                data: {
                    song: songs
                }
            }
        )
        response.code(200);
        return response;
    }

    async getSongByIdHandler(request, h) {
        const { id } = request.params;
        const song = await this._service.getSongById(id);
        const response = h.response(
            {
                status: 'success',
                data: {
                    song
                }
            }
        );
        response.code(200);
        return response;
    }

    async putSongByIdHandler(request, h) {
        this._validator.validateSongPayload(request.payload);
        const { id } = request.params;
        await this._service.editSongById(id, request.payload);
        const response = h.response(
            {
                status: 'success',
                message: 'Successfully updated song'
            }
        )
        response.code(200);
        return response;
    }

    async deleteSongByIdHandler(request) {
        const { id } = request.params;
        await this._service.deleteSongById(id);
        const response = h.response(
            {
                status: 'success',
                message: 'Successfully deleted song'
            }
        )
        response.code(200);
        return response;
    }
}

module.exports = SongHandler;
