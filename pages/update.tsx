// pages/update.tsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import ItemForm from "../components/ItemForm";
import { Item } from "../types/item";

const Update = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    if (id) {
      axios.get("/api/items").then((response) => {
        const foundItem = response.data.find((i: Item) => i.id === id);
        setItem(foundItem);
      });
    }
  }, [id]);

  const handleSave = async (updatedItem: Item) => {
    await axios.put("/api/items", updatedItem);
    router.push("/");
  };

  if (!item) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <header className="w-full bg-blue-600 py-4 text-white shadow-md mb-6">
        <h1 className="text-5xl font-bold text-center">Update Produk</h1>
      </header>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <ItemForm initialItem={item} onSave={handleSave} />
      </div>
    </div>
  );
};

export default Update;
