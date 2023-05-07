import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "./config";

function useCart() {
  const { items } = useSelector((state) => state.cart);
  const { uid } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const handleCartUpdate = async () => {
    if (!uid) return;
    setLoading(true);
    const collectionRef = collection(firestore, "cart");
    const q = await query(collectionRef, where("user_id", "==", uid));
    const documents = await getDocs(q);
    if (documents.empty) {
      await addDoc(collectionRef, {
        items,
        user_id: uid,
        createdOn: serverTimestamp(),
        lastModifiedOn: serverTimestamp(),
      });
    } else {
      const cid = documents.docs[0].id;
      let newItems = [...items];
      await updateDoc(doc(firestore, "cart", cid), {
        items: newItems,
      });
    }
    setLoading(false);
  };

  return { loading, handleCartUpdate };
}

export default useCart;
