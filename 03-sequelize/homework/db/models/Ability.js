const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Ability", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "compositeKey", //enlaza name con mana_cost
      validate: {
        notContains: 'henry',
        fn(value){
          if(value === 'Soy Henry'){
            throw new Error('no puede ser Soy Henry')
          }
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
    },
    mana_cost: {
      allowNull: false,
      type: DataTypes.FLOAT,
      unique: "compositeKey", //enlaza name con mana_cost
      validate: {
        min: 10.0,
        max: 250.0,
      },
    },
    summary: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} ${Math.round(
          this.mana_cost
        )} points of mana - Description: ${this.description}`;
      }, //fireball(500 points of mana) - Description: a ball of fire,
    },
  });
};

//nombre    apellido
//Homero      Simpson
//Homero      Simpson ?
