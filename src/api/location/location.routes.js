const LocationRoutes = require("express").Router();
const { authorize } = require("../../middleware/auth");
const { getAllLocations, getLocationById, create, update, remove } = require("./location.controller");
const upload = require("../../middleware/file");
const rateLimit = require("express-rate-limit");

const locationCreateRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1min
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
});

LocationRoutes.get('/', [authorize], getAllLocations);
LocationRoutes.get('/:id', [authorize], getLocationById);
LocationRoutes.post('/', [authorize, locationCreateRateLimit], upload.single("photo"), create);
LocationRoutes.patch('/:id', [authorize], upload.single("photo"), update);
LocationRoutes.delete('/:id', [authorize], remove);


module.exports = LocationRoutes;