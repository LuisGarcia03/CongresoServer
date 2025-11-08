import express from "express";
import Participante from "./models/Participante.js";
import cors from "cors";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*",
  })
);
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.get("/api/listado", (req, res) => {
  console.log("entra");
  const q = req.query.q;
  if (q && q.trim() !== "") {
    // Buscar por query en varios campos
    Participante.search(q)
      .then(([rows]) => {
        res.json({ success: true, data: rows });
      })
      .catch((err) => {
        console.error("Error: ", err);
        res
          .status(500)
          .json({ success: false, data: "Sorry! Something went wrong" });
      });
  } else {
    // Sin q -> devolver todos
    Participante.getAll()
      .then(([rows]) => {
        res.json({ success: true, data: rows });
      })
      .catch((err) => {
        console.error("Error: ", err);
        res
          .status(500)
          .json({ success: false, data: "Sorry! Something went wrong" });
      });
  }
});

app.get("/api/participante/:id", (req, res) => {
  const participanteId = req.params.id;
  Participante.getById(participanteId)
    .then(([rows]) => {
      if (rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, data: "Participante not found" });
      }
      res.json({ success: true, data: rows[0] });
    })
    .catch((err) => {
      console.error("Error: ", err);
      res
        .status(500)
        .json({ success: false, data: "Sorry! Something went wrong" });
    });
});

app.post("/api/registro", (req, res) => {
  const { nombre, apePaterno, apeMaterno, email, twitter, ocupacion, avatar } =
    req.body;
  if (
    !nombre ||
    !apePaterno ||
    !apeMaterno ||
    !email ||
    !twitter ||
    !ocupacion ||
    !avatar
  ) {
    return res
      .status(400)
      .json({ success: false, data: "All fields are required" });
  }
  const newParticipante = {
    nombre,
    apePaterno,
    apeMaterno,
    email,
    twitter,
    ocupacion,
    avatar,
  };
  Participante.create(newParticipante)
    .then(([result]) => {
      res.status(201).json({
        success: true,
        data: { id: result.insertId, ...newParticipante },
      });
    })
    .catch((err) => {
      console.error("Error: ", err);
      res
        .status(500)
        .json({ success: false, data: "Sorry! Something went wrong" });
    });
});
