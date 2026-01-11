const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModel } = require('../../album/utils');

class NoteService {
    constructor() {
        this._pool = new Pool();
    }

    async addAlbum({ name, year}) {

    }
}
