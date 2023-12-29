import { convertToSqlDate } from "./date";
import { db } from "./db"
export const getAllThanhToanUser = async (IDUser) => {
    try {
        const treatmentPlans = await db("KeHoachDieuTri")
            .where("IDBenhNhan", IDUser)
            .select("IDKeHoachDieuTri");
        console.log(treatmentPlans)

        const payments = await db("ThanhToan")
            .whereIn("IDKeHoachDieuTri", treatmentPlans.map((plan) => plan.IDKeHoachDieuTri))
            .select("*");
        console.log(payments)
        return payments
    } catch (error) {
        throw new Error(error)
    }
}

export const updatePayment = async (IDThanhToan, tienTra) => {
    try {
        const loaiThanhToan = 1

        // Bắt đầu một transaction
        await db.transaction(async (trx) => {
            // Lấy thông tin thanh toán
            const paymentInfo = await trx("ThanhToan").select().where({ IDThanhToan }).first();

            if (!paymentInfo) {
                throw new Error("Không tìm thấy thông tin thanh toán");
            }

            // Lấy thông tin kế hoạch điều trị
            const treatmentPlan = await trx("KeHoachDieuTri")
                .select("chiPhi")
                .where({ IDKeHoachDieuTri: paymentInfo.IDKeHoachDieuTri })
                .first();

            if (!treatmentPlan) {
                throw new Error("Không tìm thấy thông tin kế hoạch điều trị");
            }

            // Tính toán tiền thối
            const tienThoi = tienTra - treatmentPlan.chiPhi;

            // Cập nhật bảng ThanhToan
            await trx("ThanhToan")
                .where({ IDThanhToan })
                .update({
                    tienTra,
                    tienThoi,
                    ngayGiaoDich: trx.fn.now(),
                    loaiThanhToan: loaiThanhToan
                });
        });

        return true
    } catch (error) {
        console.error("Lỗi khi cập nhật thanh toán:", error);
        throw new Error("Lỗi khi cập nhật thanh toán");
    }
}