import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { IDatabaseUser } from "../interfaces/IDatabaseUser";
import { ITweet } from "../interfaces/ITweet";

export const useTweets = () => {
  const getTweets = async (): Promise<ITweet[] | undefined> => {
    try {
      const tweets: ITweet[] = [];
      const querySnapshot = query(
        collection(db, "tweets"),
        orderBy("date", "desc")
      );
      const snapshot = await getDocs(querySnapshot);

      if (snapshot) {
        snapshot.forEach((doc) => {
          const tweetData = doc.data() as ITweet | null;
          if (tweetData) {
            tweets.push(tweetData);
          }
        });
      }

      return tweets;
    } catch (error) {
      console.error("Error while getting tweets!");
      return undefined;
    }
  };

  const getUserTweets = async (
    uid: string | undefined
  ): Promise<ITweet[] | undefined> => {
    try {
      const tweets: ITweet[] = [];
      const querySnapshot = query(
        collection(db, "tweets"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      );
      const snapshot = await getDocs(querySnapshot);

      if (snapshot) {
        snapshot.forEach((doc) => {
          const tweetData = doc.data() as ITweet | null;
          if (tweetData) {
            tweets.push(tweetData);
          }
        });
      }

      return tweets;
    } catch (error) {
      console.error("Error while getting user tweets!", error);
      return undefined;
    }
  };

  const updateUserTweets = async (
    uid: string | undefined,
    updatedUserData: IDatabaseUser | null
  ) => {
    try {
      const userTweets = await getUserTweets(uid);

      if (userTweets) {
        const batch = writeBatch(db);

        userTweets.forEach((tweet: ITweet) => {
          const tweetRef = doc(db, "tweets", tweet.id);
          batch.update(tweetRef, {
            userName: updatedUserData?.name,
            userPhoto: updatedUserData?.photo ?? null,
          });
        });

        await batch.commit();
        console.log("Updated user Tweets.");
      }
    } catch (error) {
      console.error("Error while updating user tweets", error);
    }
  };

  const createTweet = async (
    user: IDatabaseUser | null,
    content: string
  ): Promise<void> => {
    const newTweetID = crypto.randomUUID();

    await setDoc(doc(db, `tweets/${newTweetID}`), {
      id: newTweetID,
      uid: user?.uid,
      content: content,
      date: new Date().toISOString(),
      userName: user?.name,
      userPhoto: user?.photo,
      bgColor: user?.avatarBgColor ?? "#000",
    }).then(() => {
      console.log("Tweet created successfully!");
    });
  };

  return {
    getTweets,
    getUserTweets,
    updateUserTweets,
    createTweet,
  };
};
