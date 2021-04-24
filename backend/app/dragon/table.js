const pool = require("../../databasePool");
const DragonTraitTable = require("../dragonTrait/table");

class DragonTable {
  static storeDragon(dragon) {
    const { birthdate, nickname, generationId } = dragon;

    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO dragon(birthdate, nickname, "generationId") 
         VALUES($1, $2, $3) RETURNING id`,
        [birthdate, nickname, generationId],
        (error, response) => {
          if (error) return reject(error);

          const dragonId = response.rows[0].id;

          // reolves all promises asyncronuous
          Promise.all(
            dragon.traits.map(({ traitType, traitValue }) => {
              // an [] of Promises
              return DragonTraitTable.storeDragonTrait({
                dragonId,
                traitType,
                traitValue,
              });
            })
          )
            .then(() => resolve({ dragonId }))
            .catch((error) => reject(error));
        }
      );
    });
  }

  static getDragon({ dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT birthdate, nickname, "generationId" 
         FROM dragon
         WHERE dragon.id=$1
      `,
        [dragonId],
        (error, response) => {
          if (error) return reject(error);

          if (response.rows.length === 0) return;
          resolve(response.rows[0]);
        }
      );
    });
  }

  static updateDragon({ dragonId, nickname }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `
      UPDATE dragon SET nickname=$1 WHERE id=$2`,
        [nickname, dragonId],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }
}

// DragonTable.getDragon({ dragonId: 1 })
//   .then((dragon) => console.log(dragon))
//   .catch((error) => console.error("error", error));

module.exports = DragonTable;
