const express = require("express");
const cors = require("cors");

const UserRoutes = require("./api/user/user.routes");
const PeliculaRoutes = require("./api/peliculas/pelicula.routes");
const LocationRoutes = require("./api/location/location.routes");

const { connectDb } = require("./helpers/database/db");

const { setUpCloudinary } = require("./helpers/utils/cloudinary");

const PORT = process.env.PORT || 8000;

connectDb();

setUpCloudinary();

const app = express();

app.use(cors({
    origin: (_origin, callback) => {
        callback(null, true);
    },
    credentials: true
}));

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json({ limit: '1mb' }));

app.use(express.urlencoded({ limit: '1mb', extended: true }));

app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/pelicula', PeliculaRoutes);
app.use('/api/v1/location', LocationRoutes);

app.use((error, _req, res, _next) => {
    return res
        .status(error.code || 500)
        .json(error.message || 'Unexpected error');
});


app.use('*', (_req, _res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = 'Route not found';
    return next(error);
});

app.disable('x-powered-by');

app.listen(PORT, () => {
    console.log('Server on air 🌬')
});