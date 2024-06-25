import { DataTypes } from 'sequelize';
import db from '../database/db.js'

const UserModel = db.define('users', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },  // que sea único y que no permita nulos
    password: { type: DataTypes.STRING, allowNull: false }  // que no permita nulos
});

export default UserModel