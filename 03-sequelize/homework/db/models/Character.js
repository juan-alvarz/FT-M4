const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Character",
    {
      code: {
        type: DataTypes.STRING(5),
        allowNull: false, //hace que sea obligatoria
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, //hace que sea obligatoria
        unique: true,
      },
      age: {
        type: DataTypes.INTEGER,
        get(){
          const value = this.getDataValue('age'); //se guarda age en value
          return value ? `${age} years old` : null;
        }
      },
      race: {
        type: DataTypes.ENUM(
          "Human",
          "Elf",
          "Machine",
          "Demon",
          "Animal",
          "Other"
        ), //limita los valores, ej: genero
        defaultValue: "Other",
      },
      hp: {
        type: DataTypes.FLOAT,
        allowNull: false, //hace que sea obligatoria
      },
      mana: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      data_added: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
};
