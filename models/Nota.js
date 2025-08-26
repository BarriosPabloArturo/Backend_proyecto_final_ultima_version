const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  texto: String,
  completado: { type: Boolean, default: false }
}, { _id: false });

// Esquema para eventos del calendario
const eventoSchema = new mongoose.Schema({
  dia: Number,
  titulo: String,
  descripcion: String
}, { _id: false });

const notaSchema = mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now
  },
  titulo: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['texto', 'checklist', 'sketchpad', 'voz', 'calendario'], // <-- Agregado 'calendario'
    default: 'texto'
  },
  nota: String, // para texto y sketchpad (puedes guardar base64 aquí)
  items: [itemSchema], // para checklist
  voz: String, // para nota de voz (URL o base64)
  eventos: [eventoSchema], // para calendario - arreglo de eventos
  mes: Number, // para calendario - mes (0-11)
  anio: Number // para calendario - año
});

module.exports = mongoose.model('Nota', notaSchema);





// const mongoose = require('mongoose');

// const notaSchema = mongoose.Schema({
//     fecha:{
//         type: Date,
//         default: Date.now
//     },
//     titulo:{
//         type: String,
//         required:true
//     },
//     nota:{
//         type:String, 
//         required:true
//     }
// })

// module.exports = mongoose.model('Nota', notaSchema);