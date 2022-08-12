const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const schema = new Schema(
    {
        title: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        locations: [{ type: Schema.Types.ObjectId, ref: "locations", required: false }],
        description: { type: String, required: false }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("peliculas", schema);


