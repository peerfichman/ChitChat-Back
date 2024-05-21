const statusOptions = Object.freeze({
    NOT_STARTED: 'Not Started',
    RUNNING: 'Running',
    COMPLETED: 'Completed',
    PROCESSING: 'Processing',
});
const HttpStatusCode = Object.freeze({
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
});

const registerOrJoin = Object.freeze({
    REGISTER: 'register',
    JOIN: 'join'
});

module.exports = {statusOptions, HttpStatusCode, registerOrJoin};