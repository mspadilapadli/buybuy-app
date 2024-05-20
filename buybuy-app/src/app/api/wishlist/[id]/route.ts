import { deleteWishlist, getWishlistById } from "@/app/db/models/wishlist";

export type getWishlistParams = {
    params: {
        id: string;
    };
};

export const GET = async (request: Request, { params }: getWishlistParams) => {
    // console.log(params, "paramID");
    const data = await getWishlistById(params.id);
    return Response.json(data);
};

export const DELETE = async (
    request: Request,
    { params }: getWishlistParams
) => {
    console.log(params, "route delte");
    const data = await deleteWishlist(params.id);

    return Response.json({
        message: `Data has been deleted`,
    });
};
