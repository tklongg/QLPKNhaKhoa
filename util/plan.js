import { db } from "./db";

export const getAllTreatmentPlansByUserId = async (userId) => {
    return await db("KeHoachDieuTri").where("IDBenhNhan", userId);
};
