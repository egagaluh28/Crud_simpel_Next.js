// pages/api/items.ts
import { NextApiRequest, NextApiResponse } from "next";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { Item } from "../../types/item";

const filePath = join(process.cwd(), "data", "items.json");

const getItems = (): Item[] => {
  const jsonData = readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};

const saveItems = (items: Item[]) => {
  writeFileSync(filePath, JSON.stringify(items, null, 2));
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(getItems());
      break;
    case "POST":
      const newItem: Item = req.body;
      const items = getItems();
      items.push(newItem);
      saveItems(items);
      res.status(201).json(newItem);
      break;
    case "PUT":
      const updatedItem: Item = req.body;
      const updatedItems = getItems().map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      saveItems(updatedItems);
      res.status(200).json(updatedItem);
      break;
    case "DELETE":
      const { id } = req.body;
      const filteredItems = getItems().filter((item) => item.id !== id);
      saveItems(filteredItems);
      res.status(200).json({ id });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
