import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { fakeMenu } from "../fakeData/fakeMenu";
import { User } from "@/types/User";
import { fakeProducts } from "@/fakeData/fakeProducts";
import { fakeCategories } from "@/fakeData/fakeCategories";

const NEW_USER_BY_DEFAULT = {
  products: fakeProducts.LARGE,
  categories: fakeCategories.LARGE,
}

export const getUser = async (idUser: string): Promise<User | undefined> => {
  const docRef = doc(db, "users", idUser);

  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const userReceived = docSnapshot.data();
    return userReceived as User;
  }
};

export const createUser = async (userId: string): Promise<User> => {
  const docRef = doc(db, "users", userId);

  const newUserToCreate: User = {
    username: userId,
    menu: fakeMenu.LARGE,
    categories: NEW_USER_BY_DEFAULT.categories
  };

  await setDoc(docRef, newUserToCreate);
  return newUserToCreate;
};

export const authenticateUser = async (userId: string): Promise<User> => {
  const existingUser = await getUser(userId);

  if (!existingUser) {
    return await createUser(userId);
  }
  return existingUser;
};
