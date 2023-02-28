const express = require("express");
const MobilGyarto = require("../models/MobilGyarto");
const Telefon = require("../models/Telefon");

const router = express.Router();

//Post Method
router.post("/gyarto", async (req, res) => {
  const ujTelefon = new MobilGyarto({
    _id: req.body._id,
    nev: req.body.nev,
    alapitva: req.body.alapitva,
    elnok: req.body.elnok,
  });

  try {
    const ujTelefonMentes = await ujTelefon.save();
    res.status(201).json({ _id: ujTelefonMentes._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getGyartok", async (req, res) => {
  try {
    const data = await MobilGyarto.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/proba", async (req, res) => {
  try {
    const data = await Telefon.find().populate("gyarto", "-_id");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getTelefonok", async (req, res) => {
  try {
    const data = await Telefon.find().populate("gyarto", "-_id");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/:gyartoId", async (req, res) => {
  try {
    const data = await Telefon.find({ gyarto: req.params.gyartoId }).populate(
      "location",
      "-_id"
    );
    if (data.length !== 0) {
      res.json(data);
    } else {
      res.status(404).json({
        message:
          "Nincs olyan telefon az adatbázisban, amit ez a gyártó gyártott.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/gyarto/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true, runValidators: true };
    // hogy a frissítés utáni dokumentumot kapjuk vissza
    const result = await Telefon.findByIdAndUpdate(id, updatedData, options);
    if (result) {
      res.send(result);
    } else {
      res
        .status(400)
        .json({ message: `${id} azonosítóval nem létezik telefon!` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Telefon.findByIdAndDelete(id);
    res.send(`A ${data.nev} nevű telefon törölve lett.`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
