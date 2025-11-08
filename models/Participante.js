import db from "../db/database.js";

class Participante {
  static async getAll() {
    return await db.execute("SELECT * FROM Participantes");
  }

  static async search(q) {
    const like = `%${q}%`;
    return await db.execute(
      `SELECT * FROM Participantes WHERE nombre LIKE ? OR apellidoPaterno LIKE ? OR apellidoMaterno LIKE ? OR email LIKE ? OR usuarioTwiter LIKE ? OR ocupación LIKE ?`,
      [like, like, like, like, like, like]
    );
  }

  static async getById(id) {
    return await db.execute(
      "SELECT * FROM Participantes WHERE idParticipante = ?",
      [id]
    );
  }

  static async create(participante) {
    return await db.execute(
      "INSERT INTO Participantes (nombre, apellidoPaterno, apellidoMaterno, email, usuarioTwiter, ocupación, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        participante.nombre ?? null,
        participante.apePaterno ?? null,
        participante.apeMaterno ?? null,
        participante.email ?? null,
        participante.twitter ?? null,
        participante.ocupacion ?? null,
        participante.avatar ?? null,
      ]
    );
  }
}

export default Participante;
