/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable(
        'song',
        {
            id: {
                type: 'VARCHAR(50)',
                primaryKey: true,
            },
            title: {
                type: 'TEXT',
                notNull: true,
            },
            year: {
                type: 'INTEGER',
                notNull: true,
            },
            genre: {
                type: 'TEXT',
                notNull: true,
            },
            performer: {
                type: 'TEXT',
                notNull: true,
            },
            duration: {
                type: 'INTEGER',
                notNull: false,
                default: null,
            },
            album_id: {
                type: 'VARCHAR(50)',
                notNull: false,
                references: 'album',
                onDelete: 'CASCADE',
            },
            created_at: {
                type: 'TEXT',
                notNull: true,
            },
            updated_at: {
                type: 'TEXT',
                notNull: true,
            },
        }
    )
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('song');
};
