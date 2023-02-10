module.exports = {
    belongsToUser(user_id, post_id) {
        return user_id === post_id
    },
    format_date: (date) => {
        return date.LocaleDateString();
    },
};