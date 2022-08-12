const Pelicula = require("./pelicula.model");
const { setError } = require("../../helpers/utils/error");
const { deleteFile } = require("../../middleware/delete-file");

const getAllPeliculas = async (req, res, next) => {
    try {
        const peliculas = await Pelicula.find().sort({ createdAt: 'desc' }).populate("locations");
        return res.status(200).json({
            message: 'All Peliculas',
            peliculas
        })
    } catch (error) {
        return next(setError(500, error.message | 'Failed recover all game'));
    }
}

const getPeliculaById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pelicula = await Pelicula.findById(id).populate("locations");
        if (!pelicula) return next(setError(404, error.message | 'Pelicula not found'));
        return res.status(200).json({
            message: 'Pelicula by Id',
            pelicula
        })

    } catch (error) {
        return next(setError(500, error.message | 'Failed pelicula id'));
    }
}

const create = async (req, res, next) => {
    try {
        const pelicula = new Pelicula(req.body);
        // Recogemos el path -> url de cloudinary - cover
        if (req.file) pelicula.image = req.file.path;
        const peliculaInDb = await pelicula.save();

        return res.status(201).json({
            message: 'Created new pelicula',
            peliculaInDb
        })
    } catch (error) {
        return next(setError(500, error.message | 'Failed create pelicula'));
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pelicula = new Pelicula(req.body);
        pelicula._id = id;
        // Si pasamos un nuevo cover -> se añade sobre su porpiedad
        if (req.file) pelicula.image = req.file.path;
        const updatedPelicula = await Pelicula.findByIdAndUpdate(id, pelicula);
        if (!updatedPelicula) return next(setError(404, 'Pelicula not found'));
        return res.status(201).json({
            message: 'Updated Pelicula',
            updatedPelicula
        })

    } catch (error) {
        return next(setError(500, error.message | 'Failed updated pelicula'));
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedPelicula = await Pelicula.findByIdAndDelete(id);
        if (deletedPelicula.image) deleteFile(deletedPelicula.image);
        if (!deletedPelicula) return next(setError(404, 'Pelicula not found'));
        return res.status(200).json({
            message: 'Delete Pelicula',
            deletedPelicula
        })
    } catch (error) {
        return next(setError(500, error.message | 'Failed deleted pelicula'));
    }
}

module.exports = {
    getAllPeliculas,
    getPeliculaById,
    create,
    update,
    remove
};