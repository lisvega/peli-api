const PeliculaRoutes = require("express").Router();
const { authorize } = require("../../middleware/auth");
const { getAllPeliculas, getPeliculaById, create, update, remove } = require("./pelicula.controller");
const upload = require("../../middleware/file");
const rateLimit = require("express-rate-limit");

const peliculaCreateRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1min
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
});

PeliculaRoutes.get('/', getAllPeliculas);
PeliculaRoutes.get('/:id', [authorize], getPeliculaById);
PeliculaRoutes.post('/', [authorize, peliculaCreateRateLimit], upload.single("image"), create);
PeliculaRoutes.patch('/:id', [authorize], upload.single("image"), update);
PeliculaRoutes.delete('/:id', [authorize], remove);


module.exports = PeliculaRoutes;