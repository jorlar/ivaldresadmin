import { 
  ref, 
  get, 
  set, 
  update, 
  remove, 
  query, 
  orderByChild,
  DatabaseReference 
} from 'firebase/database';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query as firestoreQuery,
  where,
  orderBy,
  getFirestore,
  addDoc
} from 'firebase/firestore';
import { database, firestore } from '../firebase';

// Realtime Database Operations
export const databaseService = {
  // Read data
  async getData(path: string) {
    try {
      const dataRef = ref(database, path);
      const snapshot = await get(dataRef);
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  // Write data
  async setData(path: string, data: any) {
    try {
      const dataRef = ref(database, path);
      await set(dataRef, data);
      return true;
    } catch (error) {
      console.error('Error setting data:', error);
      throw error;
    }
  },

  // Update data
  async updateData(path: string, data: any) {
    try {
      const dataRef = ref(database, path);
      await update(dataRef, data);
      return true;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  },

  // Delete data
  async deleteData(path: string) {
    try {
      const dataRef = ref(database, path);
      await remove(dataRef);
      return true;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  },

  // Query data
  async queryData(path: string, orderByField: string) {
    try {
      const dataRef = ref(database, path);
      const dataQuery = query(dataRef, orderByChild(orderByField));
      const snapshot = await get(dataQuery);
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error('Error querying data:', error);
      throw error;
    }
  }
};

// Firestore Operations
export const firestoreService = {
  // Get all collections
  async getCollections(): Promise<string[]> {
    console.log('FirestoreService: Getting collections');
    try {
      const collections = await getDocs(collection(firestore, 'collections'));
      const collectionNames = collections.docs.map(doc => doc.id);
      console.log('FirestoreService: Collections retrieved:', collectionNames);
      return collectionNames;
    } catch (error) {
      console.error('FirestoreService: Error getting collections:', error);
      throw error;
    }
  },

  // Read document
  async getDocument(collectionName: string, documentId: string) {
    console.log('FirestoreService: Getting document:', { collectionName, documentId });
    try {
      const docRef = doc(firestore, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() };
        console.log('FirestoreService: Document retrieved:', data);
        return data;
      }
      console.log('FirestoreService: Document not found');
      return null;
    } catch (error) {
      console.error('FirestoreService: Error getting document:', error);
      throw error;
    }
  },

  // Read collection
  async getCollection(collectionName: string) {
    console.log('FirestoreService: Getting collection:', collectionName);
    try {
      const querySnapshot = await getDocs(collection(firestore, collectionName));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('FirestoreService: Collection retrieved:', data);
      return data;
    } catch (error) {
      console.error('FirestoreService: Error getting collection:', error);
      throw error;
    }
  },

  // Write document
  async setDocument(collectionName: string, documentId: string, data: any) {
    console.log('FirestoreService: Setting document:', { collectionName, documentId, data });
    try {
      const docRef = doc(firestore, collectionName, documentId);
      await setDoc(docRef, data);
      console.log('FirestoreService: Document set successfully');
      return true;
    } catch (error) {
      console.error('FirestoreService: Error setting document:', error);
      throw error;
    }
  },

  // Update document
  async updateDocument(collectionName: string, documentId: string, data: any) {
    console.log('FirestoreService: Updating document:', { collectionName, documentId, data });
    try {
      const docRef = doc(firestore, collectionName, documentId);
      await updateDoc(docRef, data);
      console.log('FirestoreService: Document updated successfully');
      return true;
    } catch (error) {
      console.error('FirestoreService: Error updating document:', error);
      throw error;
    }
  },

  // Create document
  async createDocument(collectionName: string, data: any) {
    console.log('FirestoreService: Creating document:', { collectionName, data });
    try {
      const collectionRef = collection(firestore, collectionName);
      const docRef = await addDoc(collectionRef, data);
      console.log('FirestoreService: Document created successfully:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('FirestoreService: Error creating document:', error);
      throw error;
    }
  },

  // Delete document
  async deleteDocument(collectionName: string, documentId: string) {
    console.log('FirestoreService: Deleting document:', { collectionName, documentId });
    try {
      const docRef = doc(firestore, collectionName, documentId);
      await deleteDoc(docRef);
      console.log('FirestoreService: Document deleted successfully');
      return true;
    } catch (error) {
      console.error('FirestoreService: Error deleting document:', error);
      throw error;
    }
  },

  // Query collection
  async queryCollection(collectionName: string, field: string, operator: any, value: any) {
    try {
      const q = firestoreQuery(
        collection(firestore, collectionName),
        where(field, operator, value)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error querying collection:', error);
      throw error;
    }
  }
}; 