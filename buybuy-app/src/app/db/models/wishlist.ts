import { ObjectId } from "mongodb";
import { getMongoDbInstance } from "../config";

export type Wishlist = {
    userId: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
};

export const getDb = async () => {
    const client = await getMongoDbInstance();
    const db = client.db("buybuy-app");
    return db;
};
export const getDataWishlist = async () => {
    const db = await getDb();
    return await db
        .collection<Wishlist>("Wishlist")
        .aggregate([
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $lookup: {
                    from: "Products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product",
                },
            },
            {
                $unwind: {
                    path: "$product",
                    preserveNullAndEmptyArrays: false,
                },
            },
        ])
        .toArray();
};

export const getWishlistById = async (id: string | ObjectId) => {
    const db = await getDb();
    console.log(id, "model ");
    const objectId = typeof id === "string" ? new ObjectId(id) : id;

    return await db.collection<Wishlist>("Wishlist").findOne({ _id: objectId });
};
// export const getWishlistByProductId = async (id: string | ObjectId) => {
//     const db = await getDb();
//     const productID = typeof id === "string" ? new ObjectId(id) : id;
//     console.log(productID, "model wishlist");

//     return await db
//         .collection<Wishlist>("Wishlist")
//         .findOne({ productId: productID });
// };

export const addWishlist = async (userId: string, productId: string) => {
    const db = await getDb();

    const date = new Date();
    const { insertedId } = await db.collection("Wishlist").insertOne({
        userId: new ObjectId(userId),
        productId: new ObjectId(productId),
        createdAt: date,
        updatedAt: date,
    });

    return await getWishlistById(insertedId);
};

export const deleteWishlist = async (id: string | ObjectId) => {
    const db = await getDb();
    console.log(id, "productId model");
    const objectId = typeof id === "string" ? new ObjectId(id) : id;

    return await db.collection("Wishlist").deleteOne({ productId: objectId });
};
