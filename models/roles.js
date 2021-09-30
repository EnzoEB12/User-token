const { model, Schema } = require("mongoose");

const RoleSchema = new Schema({
    role: {
        type: String
    }
})

module.exports = model('Roles', RoleSchema)