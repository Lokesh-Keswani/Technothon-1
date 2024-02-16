const mongoose = require('mongoose');

const classroomSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    createdAt:{       
        type: Date, 
        default: Date.now(),
    }
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;