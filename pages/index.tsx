import globals from "../styles/globals.css";

import { useState, useEffect } from "react";
import axios from "axios";
import { Item } from "../types/item";
import Link from "next/link";

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    axios.get("/api/items").then((response) => setItems(response.data));
  }, []);

  const handleDelete = async (id: string) => {
    await axios.delete("/api/items", { data: { id } });
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <header className="w-full bg-blue-600 py-4 text-white shadow-md mb-6">
        <h1 className="text-5xl font-bold text-center">
          CRUD Sederhana Menggunakan Next.js
        </h1>
      </header>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-lg mx-auto text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3">Nama Barang</th>
                <th className="px-6 py-3">Harga</th>
                <th className="px-6 py-3">Kuantitas</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 text-gray-600">${item.price}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.quantity} pcs
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200">
                        Hapus
                      </button>
                      <Link href={`/update?id=${item.id}`}>
                        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200">
                          Update
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/create">
            <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200">
              Tambah Barang
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
