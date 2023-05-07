import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "./config";

async function loadCollections(collectionName) {
    try {
        const collectionRef = collection(firestore, collectionName);
        const q = query(
            collectionRef,
            orderBy("createdOn", "desc")
        );
        const result = await getDocs(q);
        let mappedData = result.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        mappedData = mappedData.filter(elem => !elem.isDeleted);
        return mappedData;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export { loadCollections };
