const Nota = require('../models/Nota');

// Crear una nueva nota
exports.crearNota = async (req, res) => {
    try {
        // req.body puede contener: titulo, nota, tipo, items, voz, eventos, mes, anio
        let data_nota = new Nota(req.body);
        await data_nota.save();
        res.send(data_nota);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al crear la nota' });
    }
}

// Obtener todas las notas
exports.obtenerNotas = async (req, res) => {
    try {
        const data_notas = await Nota.find();
        res.json(data_notas);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al obtener las notas' });
    }
}

// Obtener una nota por ID
exports.obtenerNotaPorId = async (req, res) => {
    try {
        const data_nota = await Nota.findById(req.params.id);
        if (!data_nota) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        res.json(data_nota);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al obtener la nota' });
    }
}

// Actualizar una nota
exports.actualizarNota = async (req, res) => {
    try {
        // Extrae todos los posibles campos del body (cambiado 'año' por 'anio')
        const { titulo, nota, tipo, items, voz, eventos, mes, anio } = req.body;
        let data_nota = await Nota.findById(req.params.id);

        if (!data_nota) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }

        // Actualiza todos los campos relevantes según el tipo de nota (cambiado 'año' por 'anio')
        data_nota = await Nota.findByIdAndUpdate(
            { _id: req.params.id },
            { titulo, nota, tipo, items, voz, eventos, mes, anio },
            { new: true } // Devuelve el objeto actualizado
        );

        res.json(data_nota);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al actualizar la nota' });
    }
}

// Eliminar una nota
exports.eliminarNota = async (req, res) => {
    try {
        const data_nota = await Nota.findById(req.params.id);
        if (!data_nota) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        await Nota.findByIdAndDelete(req.params.id);
        res.json({ message: 'Nota eliminada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error al eliminar la nota' });
    }
}