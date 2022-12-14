const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Necesitare cosas para - registro
const bcrypt = require("bcrypt");
const { setError } = require("../../helpers/utils/error");
const { validationPassword } = require("../../helpers/utils/util");


const schema = new Schema(
    {
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        locations: [{ type: Schema.Types.ObjectId, ref: "locations", required: false }]
    },
    {
        timestamps: true
    }
);

schema.pre('save', function (next) {
    if (!validationPassword(this.password)) return next(setError('400', 'Contaseña Invalida'))
    this.password = bcrypt.hashSync(this.password, 16);
    next();
})

module.exports = mongoose.model("users", schema);