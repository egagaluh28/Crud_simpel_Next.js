// pages/create.tsx
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import ItemForm from "../components/ItemForm";
import { Item } from "../types/item";
import { v4 as uuidv4 } from "uuid";

const Create = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSave = async (item: Item) => {
    setLoading(true);
    try {
      item.id = uuidv4(); // Generate a unique ID for the item
      await axios.post("/api/items", item);
      router.push("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <header className="w-full bg-blue-600 py-4 text-white shadow-md mb-6">
        <h1 className="text-3xl font-bold text-center">Tambah Produk</h1>
      </header>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-lg mx-auto text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3">Judul</th>
                <th className="px-6 py-3">Input</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4 text-gray-800">Nama Produk</td>
                <td className="px-6 py-4">
                  <ItemForm onSave={handleSave} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {loading && <p className="text-center text-gray-600 mt-4">Saving...</p>}
      </div>
    </div>
  );
};

export default Create;
