import { db } from "./db";

export const getAllLieuTrinh = async () => {
    const result = db("LieuTrinh").select().where({})
    return result
}