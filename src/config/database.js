require('dotenv').config();

module.exports = {

dialect: process.env.DB_DIALECT,
host:process.env.DB_HOST,
port: process.env.DB_PORT,
username: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_BASE,
define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
},
dialectOptions: {
  timezone: '-03:00', // Substitua se o aviso persistir
},
timezone: '-03:00', // Mantenha o mesmo formato
logging: console.log,
}


