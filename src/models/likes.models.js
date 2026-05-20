const db = require('../config/db')

exports.curtir = async (postId) => {
    await db.promise().query(
        'INSERT INTO likes (post_id) VALUES (?)',
        [postId]
    );
};