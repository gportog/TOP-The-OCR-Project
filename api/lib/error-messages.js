module.exports.TYPE_MISMATCH_ERROR = function (parameter, expected, received) {
    return `Wrong type for parameter ${parameter}. Received ${received}, expected ${expected}`;
}

module.exports.MISSING_FIELD_ERROR = function (field) {
    return `Missing field "${field}"`;
}

module.exports.IO_ERROR = function (file) {
    return `File read/write error when trying to access file ${file}`;
}

module.exports.DB_CONNECT_ERROR = () => 'Error connecting to the database, check logs for details.';

module.exports.NO_DB_ERROR = () => 'This client has no default databaset set, and one was not provided.';

module.exports.DB_DOC_NOT_FOUND = function (id) {
    return `The requested document '${id}' does not exist in the database`;
}

module.exports.LIMIT_FILE_SIZE_ERROR = function (maximumSize) {
    return `The uploaded file exceeds the maximum file size supported of ${maximumSize / 1024 / 1024}MB.`;
}

module.exports.INVALID_SCHEMA_ERROR = function (validSchemas) {
    return `Schema must be one of those: ${validSchemas}`;
}

module.exports.INVALID_SCHEMA_FIELDS_ERROR = function (schemaName, schemaStructure, listErrors) {
    return `${schemaName} schema must be like that: \n ${schemaStructure}` +
        `\n Errors Found: ${listErrors}`;
}

module.exports.OCR_INDEX_OUT_OF_BOUNDS_ERROR = (docLen) => `The OCR index requested is not valid for ` +
    `this document, document length: ${docLen}`

module.exports.INTERNAL_SERVER_ERROR = () => 'The server encountered an error and could not complete ' +
    'your request. Please try again later.';

