"use server"

import { firebase_DB } from "@/Config/FirebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { cache } from "react";

export const getLoggingdata = cache(async () => {
  const db = collection(firebase_DB, "logging");
  const docRef = await getDocs(db);
  let data: any[] = [];
  docRef.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
});
