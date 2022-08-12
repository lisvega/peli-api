const Location = require("./location.model");
const { setError } = require("../../helpers/utils/error");
const { deleteFile } = require("../../middleware/delete-file");

const getAllLocations = async (req, res, next) => {
    try {
        const locations = Location.find().sort({ createAt: 'desc' }).populate("peliculas");
        return res.status(200).json({
            message: 'All Locations',
            locations
        })
    } catch (error) {
        return next(setError(500, error.message | 'Failed recover all location'));
    }
}

const getLocationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const location = await (await Location.findById(id)).populate("locations");
        if (!location) return next(setError(404, error.message | 'Location not found'));
        return res.status(200).json({
            message: 'Location by Id',
            location
        })

    } catch (error) {
        return next(setError(500, error.message | 'Failed location id'));
    }
}

const create = async (req, res, next) => {
    try {
        const location = new Location(req.body);
        // Recogemos el path -> url de cloudinary - cover
        if (req.file) location.photo = req.file.path;
        const locationInDb = await location.save();

        return res.status(201).json({
            message: 'Created new pelicula',
            locationInDb
        })
    } catch (error) {
        return next(setError(500, error.message | 'Failed create location'));
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const location = new Location(req.body);
        location._id = id;
        // Si pasamos un nuevo cover -> se añade sobre su porpiedad
        if (req.file) location.photo = req.file.path;
        const updatedLocation = await Location.findByIdAndUpdate(id, location);
        if (!updatedLocation) return next(setError(404, 'Location not found'));
        return res.status(201).json({
            message: 'Updated Location',
            updatedLocation
        })

    } catch (error) {
        return next(setError(500, error.message | 'Failed updated location'));
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedLocation = await Pelicula.findByIdAndDelete(id);
        if (deletedLocation.cover) deleteFile(deletedLocation.photo);
        if (!deletedLocation) return next(setError(404, 'Location not found'));
        return res.status(200).json({
            message: 'Delete Location',
            deletedLocation
        })
    } catch (error) {
        return next(setError(500, error.message | 'Failed deleted location'));
    }
}

module.exports = {
    getAllLocations,
    getLocationById,
    create,
    update,
    remove
};