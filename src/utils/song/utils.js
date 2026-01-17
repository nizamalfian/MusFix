const mapDBToModel = (
    {
        id, title, year, genre, performer, duration, album_id, created_at, updated_at
    }
) => (
    {
        // Check `album_id`, whether the naming is as we expect or not.
        id, title, year, genre, performer, duration, albumId: album_id, createdAt: created_at, updatedAt: updated_at
    }
)

module.exports = { mapDBToModel };
