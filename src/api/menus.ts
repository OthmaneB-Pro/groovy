import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { Menu } from "@/types/Menu";

export const updateMenusInDB = async (userId: string, menusUpdated: Menu[]) => {
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, {
    menuPack: menusUpdated,
  });
};

export const getMenus = async (userId: string): Promise<Menu[] | undefined> => {
  const docRef = doc(db, "users", userId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const { menuPack } = docSnapshot.data();
    return menuPack as Menu[];
  }
};
