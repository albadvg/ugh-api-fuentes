const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt = 10; // complejidad del encriptado

const userSchema = new mongoose.Schema(
    {
        usuario: { type: String, unique: true, trim: true, required: true }, //el nombre tiene que ser único
        contrasena: { type: String, trim: true, required: true, minlength: 6 }
    }
);

//encriptación de lla contraseña antes de guardar el docuemnto, cada vez que se utilice el método save()
userSchema.pre("save", (next) => {
    console.log(this);
    if (this.contrasena) {
        this.contrasena = bcrypt.hashSync(this.contrasena, salt);
    }
    next();
});

const User = mongoose.model("Usuario", userSchema); //cambié esta línea ojo
module.exports = User;