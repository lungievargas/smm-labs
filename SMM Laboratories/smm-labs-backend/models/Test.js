const db = required('../utils/firebase');

const Test = {
    //create a new test
    create: async ({name, description, category, price, duration, requirements}) => {
        const testdata = {
            name,
            description,
            category,
            price,
            duration: duration || null, // default duration is 60 minutes
            requirements: requirements || null,
            createdAt: new Date() // default no special requirements
        };
        const docRef = await db.collection('tests').add(testData);
        return {id: docRef.id, ...testData};
    },


    //Get all tests
getAll: async() => {
    const snapshot = await db.collection('test').get();
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
},

//Get a single test by ID
getById: async(id) => {
    const doc = await db.collection('tests').get();
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
},

//get a single test by id

getById: async (id) => {
    const doc = await db.collection('tests').doc(id).get();
    if (!doc.exists) throw new Error('Test not found');
    return {id: doc.id, ...doc.data()};
},


// update test details
update: async (id, updateData) => {
    const testRef = db.collection('tests').doc(id);
    await testRef.update(updateData);
    const updatedDoc = await testRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  },

  // Delete a test
  delete: async (id) => {
    await db.collection('tests').doc(id).delete();
    return { message: 'Test deleted successfully' };
  }
};

module.exports = Test;