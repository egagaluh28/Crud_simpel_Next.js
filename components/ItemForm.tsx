// components/ItemForm.tsx
import { useState, useEffect } from "react";
import { Item } from "../types/item";

interface ItemFormProps {
  onSave: (item: Item) => void;
  initialItem?: Item; // Optional prop for pre-filling form
}

const ItemForm = ({ onSave, initialItem }: ItemFormProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (initialItem) {
      setName(initialItem.name);
      setPrice(initialItem.price.toString());
      setQuantity(initialItem.quantity.toString());
    }
  }, [initialItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && price && quantity) {
      onSave({
        id: initialItem?.id || "", // Preserve ID if editing
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-gray-700 font-semibold">Nama Produk</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
          placeholder="Tambahkan Nama Produk"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="price" className="text-gray-700 font-semibold">Harga</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
          placeholder="Tambahkan Harga"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="quantity" className="text-gray-700 font-semibold">Jumlah</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
          placeholder="Tambahkan Jumlah"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Simpan
      </button>
    </form>
  );
};

export default ItemForm;
