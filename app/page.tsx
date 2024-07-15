"use client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-tabel";
import { columns } from "@/components/columns";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firebase_DB } from "@/Config/FirebaseConfig";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Home = () => {
  const [pengukuran, setPengukuran] = useState<any[]>([]);
  const [isPengukuran, setIsPengukuran] = useState<boolean>(true);

  const getDate = (date: string) => {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day);
  }


  const getPengukurang = () => {
    const db = collection(firebase_DB, "pengukuran");
    const unsubscribe = onSnapshot(db, (docRef) => {
      const data = docRef.docs.map(doc => ({
        id: doc.id,
        tanggal: getDate(doc.data().tanggal),
        ...doc.data(),
      }));
      setPengukuran(data);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    getPengukurang();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-center text-5xl font-bold">
        UCO Monitoring
      </h1>
      <Separator className="mt-4 mb-4" />
      <div className="w-full flex justify-center gap-4">
        <div className="flex flex-col gap-4">
          <Button variant="outline" className={cn("w-48 h-32 text-lg", {
            "bg-green-600 text-white": isPengukuran,
          })}>
            Pengukuran
          </Button>
          <Button variant="outline" className="w-48 h-32 text-lg">
            Penampungan
          </Button>
        </div>
        <Card className="w-1/2 p-4 rounded-sm">
          <DataTable title="pengukuran" columns={columns} data={pengukuran}></DataTable>
        </Card>
      </div>
    </main >
  );
}

export default Home;
