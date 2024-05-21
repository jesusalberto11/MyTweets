import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { IDatabaseUser } from "../interfaces/IDatabaseUser";
import { getRandomColor } from "../helpers/colorHelper";

export const useFirebase = () => {
  const generateRandomName = (): string => {
    const date: Date = new Date();
    const name: string = "user-";

    return name + date.getFullYear() + date.getMilliseconds();
  };

  const getUser = async (
    uid: string | undefined
  ): Promise<IDatabaseUser | null> => {
    try {
      const user = await getDoc(doc(db, `users/${uid}`));

      if (!user.exists()) return null;

      const userData: IDatabaseUser = {
        uid: user.data().uid,
        name: user.data().name,
        photo: user.data().photo,
        email: user.data().email,
      };

      return userData;
    } catch (error) {
      console.error("Error getting user from database!");
      return null;
    }
  };

  // const listenToUserUpdates = async (uid: string | undefined) => {
  //   onSnapshot(doc(db, `users/${uid}`), (snap) => {
  //     const updatedData: IDatabaseUser = snap.data() as IDatabaseUser;

  //     if (store.user === updatedData) {
  //       console.log("NO hay cambios");
  //     } else {
  //       console.log("Hay cambios");
  //       store.setUserData(updatedData);
  //       updateUserTweets(updatedData.uid, updatedData);
  //     }
  //   });
  // };

  const registerUser = async (
    uid: string,
    photo: string | null,
    name: string | null,
    email: string
  ): Promise<IDatabaseUser | null> => {
    const newName: string = name ?? generateRandomName();
    const newAvatarBgColor: string = getRandomColor();

    try {
      const user = await getDoc(doc(db, `users/${uid}`));

      if (user.exists()) {
        console.log("User exists, returning data.");
        const userData: IDatabaseUser = {
          uid: user?.data().uid,
          name: user?.data().name,
          photo: user?.data().photo,
          email: user?.data().email,
          avatarBgColor: user.data().avatarBgColor,
        };
        return userData;
      } else {
        console.log("User created, returning data.");
        await setDoc(doc(db, `users/${uid}`), {
          uid: uid,
          name: newName,
          photo: photo ?? null,
          email: email,
          avatarBgColor: newAvatarBgColor,
        });

        const userData: IDatabaseUser = {
          uid: uid,
          name: newName,
          photo: photo ?? null,
          email: email,
          avatarBgColor: newAvatarBgColor,
        };

        return userData;
      }
    } catch (error) {
      console.error("Error while creating user into the database");
      return null;
    }
  };

  const updateUser = async (
    uid: string | undefined,
    newData: Partial<IDatabaseUser>
  ): Promise<void> => {
    try {
      await updateDoc(doc(db, `users/${uid}`), {
        ...newData,
      });
    } catch (error) {
      console.error("Error updateing user in database! ", error);
    }
  };

  return {
    getUser,
    registerUser,
    updateUser,
  };
};
