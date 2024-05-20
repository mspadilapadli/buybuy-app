import { ObjectId } from "mongodb";
import { getMongoDbInstance } from "../config";

export type Products = {
    name: string;
    slug: string;
    description: string;
    excerpt: string;
    price: number;
    tags: string[];
    thumbnail: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
};

export const getDb = async () => {
    const client = await getMongoDbInstance();
    const db = client.db("buybuy-app");
    return db;
};
export const getAllProducts = async (search: string | null) => {
    const db = await getDb();
    if (!search) {
        return await db.collection<Products>("Products").find().toArray();
    }
    return await db
        .collection<Products>("Products")
        .aggregate([
            {
                $match: {
                    name: { $regex: search, $options: "i" },
                },
            },
        ])
        .toArray();
};

export const getHomeProducts = async () => {
    const db = await getDb();

    return await db
        .collection<Products>("Products")
        .find()
        .sort({ createdAt: -1 })
        .limit(6)
        .toArray();
};

export const getProductBySlug = async (slug: string) => {
    const db = await getDb();

    return await db.collection<Products>("Products").findOne({ slug });
};
