const pool = require("../../databasePool");
const DragonTraitTable = require("../dragonTrait/table");

class DragonTable {
  static storeDragon(dragon) {
    const {
      birthdate,
      nickname,
      generationId,
      isPublic,
      saleValue,
      sireValue,
    } = dragon;

    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO dragon(birthdate, nickname, "generationId", "isPublic", "saleValue", "sireValue") 
         VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
        [birthdate, nickname, generationId, isPublic, saleValue, sireValue],
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
        `SELECT birthdate, nickname, "generationId", "isPublic", "saleValue", "sireValue" 
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

  static updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue }) {
    // select update fields to create query
    const settingsMap = { nickname, isPublic, saleValue, sireValue };

    // creates key value pairs [['nickname', nickname], [],...]
    const validQueries = Object.entries(settingsMap).filter(
      ([settingKey, settingValue]) => {
        // console.log("settingKey", settingKey, "settingValue", settingValue);
        // settignValue (isPublic OR saleValue) haven't been changed yet
        if (settingValue !== undefined) {
          return new Promise((resolve, reject) => {
            // security risk here
            pool.query(
              `
            UPDATE dragon SET "${settingKey}"=$1 
            WHERE id=$2
          `,
              [settingValue, dragonId],
              (error, response) => {
                if (error) return reject(error);
                resolve();
              }
            );
          });
        }
      }
    );
    // combine several possible queries into one
    return Promise.all(validQueries);
  }
}

// backend => node app/dragon.table.js
// DragonTable.updateDragon({ dragonId: 1, nickname: "fooby" })
//   .then(() => console.log("successfully updated dragon"))
//   .catch((error) => console.error("error", error));

// DragonTable.getDragon({ dragonId: 1 })
//   .then((dragon) => console.log(dragon))
//   .catch((error) => console.error("error", error));

module.exports = DragonTable;
