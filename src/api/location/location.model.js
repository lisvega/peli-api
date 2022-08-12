const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const schema = new Schema(
    {
        nombre: { type: String, required: true },
        photo: { type: String, required: true },
        peliculas: [{ type: Schema.Types.ObjectId, ref: "peliculas", required: false }],

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("locations", schema);


