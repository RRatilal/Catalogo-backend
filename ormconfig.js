module.exports = {
   "type": "postgres",
   "url": `${process.env.DATABASE_URL}`,
   "synchronize": false,
   "entities": [
      "dist/models/*.js"
   ],
   "migrations": [
      "dist/database/migrations/*.js"
   ],
   "cli": {
      "migrationsDir": "src/database/migrations"
   }
}