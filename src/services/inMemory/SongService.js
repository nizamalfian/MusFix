const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongService {
    constructor() {
        this._songs = [];
    }

    async addSong({ title, year, genre, performer, duration, albumId }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newSong = {
            id, title, year, genre, performer, duration, albumId, createdAt, updatedAt
        }

        this._songs.push(newSong);

        const isSuccess = this._songs.some(song => song.id === id);

        if (!isSuccess) {
            throw new InvariantError('Song failed to be created');
        }

        return id;
    }

    async getSongs() {
        return this._songs.map(song =>
            (
                {
                    id: song.id,
                    title: song.title,
                    performer: song.performer,
                }
            )
        )
    }

    async getSongById(id) {
        const song = this._songs.find((song) => song.id === id);

        if (!song) {
            throw new NotFoundError(`Song with id ${id} not found`);
        }

        return {
            id: song.id,
            title: song.title,
            year: song.year,
            performer: song.performer,
            genre: song.genre,
            duration: song.duration,
            albumId: song.albumId,
        };
    }

    async editSongById(id, {title, year, genre, performer, duration, albumId }) {
        const index = this._songs.findIndex((song) => song.id === id);

        if (-1 === index) {
            throw new NotFoundError(`Song with id ${id} not found, failed to be edited`);
        }

        const updatedAt = new Date().toISOString();

        this._songs[index] = {
            ...this._songs[index],
            title, year, genre, performer, duration, albumId, updatedAt
        }
    }

    async deleteSongById(id) {
        const index = this._songs.findIndex((song) => song.id === id);

        if (-1 === index) {
            throw new NotFoundError(`Song with id ${id} not found`);
        }

        this._songs.splice(index, 1);
    }
}

module.exports = SongService;
