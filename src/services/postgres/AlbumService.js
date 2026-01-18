const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapAlbumDBToModel } = require('../../utils/album');

class AlbumService {
    constructor(songService) {
        this._pool = new Pool();
        this._songService = songService;
    }

    async addAlbum({ name, year }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO album VALUES($1, $2, $3, $4, $5) RETURNING ID',
            values: [id, name, year, createdAt, updatedAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Album failed to be created');
        }

        return result.rows[0].id;
    }

    async getAlbums() {
        const result = await this._pool.query('SELECT * FROM album');
        return result.rows.map(mapAlbumDBToModel);
    }

    async getAlbumById(id) {
        const query = {
            text: 'SELECT * FROM album WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError(`Album with id ${id} not found`);
        }

        const album = result.rows[0];
        const songs = await this._songService.getSongByAlbumId(id);

        return {
            id: album.id,
            name: album.name,
            year: album.year,
            createdAt: album.created_at,
            updatedAt: album.updated_at,
            songs: songs,
        };
    }

    async editAlbumById(id, { name, year }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE album SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
            values: [name, year, updatedAt, id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError(`Album with id ${id} not found, failed to be edited`);
        }
    }

    async deleteAlbumById(id) {
        const query = {
            text: 'DELETE FROM album WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError(`Album with id ${id} not found, failed to be deleted.`);
        }
    }
}

module.exports = AlbumService;
