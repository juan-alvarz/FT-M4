const { Router } = require("express");
const { Op, Character, Role } = require("../db");
const router = Router();

//Esto es un endpoint:
router.post("/", async (req, res) => {
  //algo de sequelize (PROMESA)
  let { code, name, hp, race, age, mana } = req.body;

  if (!code || !name || !mana || !hp) {
    return res.status(404).send("Faltan datos");
  }
  try {
    const newChar = await Character.create({
      code,
      mana,
      hp,
      name,
      age,
      race,
    });
    return res.status(201).json(newChar);
  } catch (error) {
    return res.status(404).send("Error en alguno de los datos");
  }
});

router.get("/", async (req, res) => {
  // traer todos los chars          QUERY:
  let { race, age } = req.query; //?key=value&key2=value2
  if (!race || !age) {
    //traigo todos:
    let chars = await Character.findAll();
    return res.json(chars);
  }
  //asumo que están ambos
  let charsFiltered = await Character.findAll({
    where: {
      race,
      age,
    },
  });
  return res.json(charsFiltered);
});

router.get("/:code", async (req, res) => {
  let { code } = req.params;

  if (code) {
    //pk
    let char = await Character.findByPk(code);

    if (char) {
      return res.send(char);
    }
    return res
      .status(404)
      .send(`El código ${code} no corresponde a un personaje existente`);
  }
});

router.get("/young", async (req, res) => {
  // traer chars con age<25
  let charsFiltered = await Character.findAll({
    where: {
      age: { [Op.lt]: 25 }, //lesser than
    },
  });
  return res.json(charsFiltered);
});

router.put("/:attribute", async (req, res) => {
  //recibe por params
  //value como query
  const { attribute } = req.params;
  const { value } = req.query;

  let charsUpdated = await Character.update(
    { attribute: value }, //que actualizar, donde actualizar
    {
      where: {
        attribute: null,
      },
    }
  );
  res.send("Personajes actualizados");
});

module.exports = router;
