'use strict';

function _convertBodyToModel(schemaName, model, body) {
    for (var key in body) {
        if (schemaName.schema.paths.hasOwnProperty(key)) {
            model[key] = body[key];
        }
    }
}
exports.convertBodyToModel = _convertBodyToModel;