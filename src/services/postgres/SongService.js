const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapSongDBToModel } = require('../../utils/song');

class SongService {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({ title, year, genre, performer, duration, albumId }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO song VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING ID',
            values: [id, title, year, genre, performer, duration, albumId, createdAt, updatedAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Song failed to be created');
        }

        return result.rows[0].id;
    }

    async getSongs({ title, performer}) {
        const conditions = [];
        const values = [];

        if (title) {
            values.push(`%${title}%`);
            conditions.push(`title ILIKE $${values.length}`);
        }

        if (performer) {
            values.push(`%${performer}%`);
            conditions.push(`performer ILIKE $${values.length}`);
        }

        let query = 'SELECT * FROM song';

        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        const { rows } = await this._pool.query(query, values);

        return rows.map(mapSongDBToModel);
    }

    async getSongByAlbumId(albumId) {
        const { rows } = await this._pool.query(
            {
                text: 'SELECT * FROM song WHERE album_id = $1',
                values: [ albumId ],
            }
        )
        return rows.map(mapSongDBToModel);
    }

    async getSongById(id) {
        const {rows} = await this._pool.query(
            {
                text: 'SELECT * FROM song WHERE id = $1',
                values: [id],
            }
        )

        if (!rows.length) {
            throw new NotFoundError(`Song with id ${id} not found`);
        }

        return rows.map(mapSongDBToModel)[0];
    }

    async editSongById(id, {title, year, genre, performer, duration, albumId }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE song SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
            values: [title, year, genre, performer, duration, albumId, updatedAt, id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError(`Song with id ${id} not found, failed to be edited`);
        }
    }

    async deleteSongById(id) {
        const query = {
            text: 'DELETE FROM song WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError(`Song with id ${id} not found`);
        }
    }
}

module.exports = SongService;
