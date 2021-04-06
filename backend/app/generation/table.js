const pool = require("../../databasePool");

class GenerationTable {
  // "static" means no need for a new instance
  static storeGeneration(generation) {
    // console.log(generation);

    pool.query(
      "INSERT INTO generation(expiration) VALUES($1)",
      [generation.expiration],
      (error, response) => {
        if (error) return console.error(error);
      }
    );
  }
}

module.exports = GenerationTable;
