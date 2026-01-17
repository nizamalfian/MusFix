const { nanoid } = require("nanoid");
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumService {
    constructor() {
        this._albums = [];
    }

    async addAlbum({ name, year}) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newAlbum = {
            id, name, year, createdAt, updatedAt
        }

        this._albums.push(newAlbum);

        const isSuccess = this._albums.some(album => album.id === id);

        if (!isSuccess) {
            throw new InvariantError('Album failed to be created');
        }

        return id;
    }

    async getAlbums() {
        return this._albums.map(album =>
            (
                {
                    id: album.id,
                    name: album.name,
                    year: album.year,
                }
            )
        )
    }

    async getAlbumById(id) {
        const album = this._albums.find((album) => album.id === id)

        if (!album) {
            throw new NotFoundError(`Album with id ${id} not found`);
        }

        return {
            id: album.id,
            name: album.name,
            year: album.year,
            createdAt: album.createdAt,
            updatedAt: album.updatedAt,
        };
    }

    async editAlbumById(id, { name, year }) {
        const index = this._albums.findIndex((album) => album.id === id);

        if (-1 === index) {
            throw new NotFoundError(`Album with id ${id} not found, failed to be edited`);
        }

        const updatedAt = new Date().toISOString();

        this._albums[index] = {
            ...this._albums[index],
            name, year, updatedAt,
        };
    }

    async deleteAlbumById(id) {
        const index = this._albums.findIndex((album) => album.id === id);

        if (-1 === index) {
            throw new NotFoundError(`Album with id ${id} not found, failed to be deleted.`);
        }

        this._albums.splice(index, 1);
    }
}

module.exports = AlbumService;
