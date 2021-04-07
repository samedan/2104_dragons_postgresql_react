const pool = require("../../databasePool");
const DragonTable = require("./table");

const getDragonWithTraits = ({ dragonId }) => {
  return Promise.all([DragonTable.getDragon({ dragonId })]);
};
