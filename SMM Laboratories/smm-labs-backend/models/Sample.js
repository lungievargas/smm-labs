const db = require('../utils/firebase');


const Sample ={
    create: async ({clientId, type, tests}) => {
        const sampleData = {
            clientId,
            type,
            tests,status: 'submitted',
            aubmittedAt: new Date(),
            completedAt: null,
            results: {}
};


const docRef = await db.collection('samples').add(sampleData);
return {id: docRef.id, ...sampleData};
    },

    //Get all samples

    getAll:async () => {
        const snapshot = await db.collection('samples').get();
        return snapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
    },

    //Get single sample by ID 
    getById: async (id) => {
        const doc = await db.collection('samples').doc(id).get();
        if (!doc.exists) {
            throw new Error('Sample not found');
        }
        return {id: doc.id, ...doc.data()};
    },


    //Update sample status or results
    update: async (id, updateData) => {
       const sampleRef = db.collection('samples').doc(id);
       await sampleRef.update(updateData);
       const updateDoc = await sampleRef.get();
       return {id: updateDoc.id, ...updateDoc.data()};
    },

    //Delete a sample
    delete: async (id) =>{
        await db.collection('samples').doc(id).delete();
        return {message: 'Sample deleted successfully'};
    }
};