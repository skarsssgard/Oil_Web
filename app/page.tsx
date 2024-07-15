"use client";
import { Button } from "@/components/ui/button"

import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firebase_DB } from "@/Config/FirebaseConfig";
import { DataTable } from "@/components/data-tabel";
import { Logging, columns, data } from "@/components/columns";
import { useEffect, useState } from "react";

export default function Home() {
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
              Tandon Pengukuran
            </h2>
          </div>
        </div>
        <div className="px-20">
          <div className="grid grid-rows-2 grid-flow-col gap-4">
            <div className="flex justify-center">
              <Button variant="outline" className="w-48 h-48 text-2xl border-2 border-black bg-green-600">
                Pengukuran
              </Button>
            </div>
            <div className="flex justify-center">
              <Button type="button" variant="outline" className="flex justify-right w-48 h-48 text-2xl border-2 border-black">
                Penampungan
              </Button>
            </div>
            <DataTable columns={columns} data={data}></DataTable>
          </div>
        </div>
      </div>
    </nav>
  );
}
