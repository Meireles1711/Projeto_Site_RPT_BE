const db = require('../config/db')

exports.curtir = async (postId) => {
    await db.query(
        'INSERT INTO likes (post_id) VALUES (?)',
        [postId]
    );
};