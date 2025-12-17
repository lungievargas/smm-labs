const db = require("../firebase");

class Service {
  constructor(type, description, image) {
    this.type = type;
    this.description = description;
    this.image = image;
  }

  async save() {
    const docRef = await db.collection("services").add({
      type: this.type,
      description: this.description,
      image: this.image,
    });
    return docRef.id;
  }

  static async getAll() {
    const snapshot = await db.collection("services").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async update(id, data) {
    await db.collection("services").doc(id).update(data);
    return { id, ...data };
  }

  static async delete(id) {
    await db.collection("services").doc(id).delete();
    return { message: `Service ${id} deleted` };
  }
}

module.exports = Service;
