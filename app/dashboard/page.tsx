"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button"


import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebase_DB } from "@/Config/FirebaseConfig";
import { DataTable } from "@/components/data-tabel";
import { Logging, columns } from "@/components/columns";
import { format, parse } from "date-fns";

export default function Penampungan() {
  const [data, setData] = useState<Logging[]>();
  const router = useRouter()
  const navigateToPengukuran = () => {
    router.push('/');
  };

  useEffect(() => {
    const Ref = collection(firebase_DB, "penampungan");
    const filter = query(Ref,  orderBy("tanggal", "desc"));
        const subs = onSnapshot(filter, (snapshot) => {
            const data: Logging[] = snapshot.docs.map((doc) => {
                const docData = doc.data();
                const parsedDate = parse(docData.tanggal, "d-M-yyyy", new Date());
                return {
                    tanggal: format(parsedDate, "dd-MM-yyyy"),
                    waktu: docData.waktu,
                    volume : docData.volume,
                };
            });
            setData(data);
        });
        return () => {
          subs();
      };
      }, []);

  return (
    <nav>
      <div className="mx-auto py-auto">
        <div className="flex justify-between p-15 py-10 pb-5 items-center border-y-2 border-black mr-10 ml-10 border-t-0">
          <h1 className="text-5xl font-bold tracking-tight">
            UCO Monitoring
          </h1>
        </div>
        <div className="flex justify-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight py-5">
              Tandon Penampungan
            </h2>
          </div>
        </div>
        <div className="px-20">
          <div className="grid grid-rows-2 grid-flow-col gap-4">
          <div className="flex justify-center">
              <Button type="button" onClick={navigateToPengukuran} variant="outline" className="flex justify-right w-48 h-48 text-2xl border-2 border-black">
                Pengukuran
              </Button>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" className="flex justify-right w-48 h-48 text-2xl border-2 border-black bg-green-600">
                Penampungan
              </Button>
            </div>
            <DataTable columns={columns} data={data || []}></DataTable>
          </div>
        </div>
      </div>
    </nav>
  );
}
