const { Sequelize, Op } = require("sequelize");
const modelCharacter = require("./models/Character.js");
const modelAbility = require("./models/Ability.js");
const modelRole = require("./models/Role.js");

const db = new Sequelize(
  "postgres://juan:2318@localhost:5432/henry_sequelize",
  {
    logging: false,
  }
);

modelCharacter(db);
modelAbility(db);
modelRole(db);

let { Ability, Character, Role } = db.models;

Character.hasMany(Ability);
Ability.belongsTo(Character);

Character.belongsTo(Role, { through: "Character_Role" });
Role.belongsTo(Character, { through: "Character_Role" });

module.exports = {
  ...db.models,
  db,
  Op,
};
