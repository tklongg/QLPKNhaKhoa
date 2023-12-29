import { db } from './db'

export const getAllUsers = async () => {
    try {
        const users = await db("UserTable").where("userType", "Patient").select()
        return users
    } catch (error) {
        console.log("lỗi tìm kiếm user", error)
        return []
    }
}
export const getAllDentists = async () => {
    try {
        const users = await db("UserTable").where("userType", "Dentist").select()
        return users
    } catch (error) {
        console.log("lỗi tìm kiếm user", error)
        return []
    }
}

export const getUserById = async (id) => {
    try {
        const user = await db("UserTable").where("IDUser", id)
        if (user.length > 0) {
            return user
        }
        else return null
    } catch (error) {
        console.log("lỗi tìm kiếm user", error)
        return null
    }
}
export const getUserByPhone = async (phone) => {
    try {
        const user = await db("UserTable").where("soDienThoai", phone)
        if (user) {
            return user
        }
        else return null
    } catch (error) {
        console.log("lỗi tìm kiếm user bằng đt", error)
        return null
    }
}

export const addUser = async (phone, ten, ngaySinh, gioiTinh, email) => {
    const [IDUser] = await db("UserTable").returning('IDUser').insert({ soDienThoai: phone, ten: ten, ngaySinh: ngaySinh, gioiTinh: gioiTinh, email: email })
    console.log("added", {
        IDUser: IDUser,
        soDienThoai: phone, ten: ten, ngaySinh: ngaySinh, gioiTinh: gioiTinh, email: email
    })
    return {
        IDUser: IDUser,
        soDienThoai: phone, ten: ten, ngaySinh: ngaySinh, gioiTinh: gioiTinh, email: email
    }
}

export const deleteUser = async (id) => {
    try {
        await db("UserTable").where("IDUser", id).del()
        console.log("deleted")
    } catch (error) {
        console.log("failed to delete")
    }
}

export const updateUser = async (id, data) => {
    try {
        await db("UserTable").where("IDUser", id).update(
            data
        )
        console.log('User updated successfully');
    } catch (error) {
        console.log('User updated not successed');
    }
}


//lay thon tin chi tiet user theo id
export const getUserDetailById = async (id) => {
    try {
        const userID = id; // Thay đổi giá trị này thành ID người dùng mong muốn
        console.log("🚀 ~ file: user.js:65 ~ getUserDetailById ~ userID:", userID)

        const query = `
    SELECT
        U.IDUser,
        U.ten,
        U.soDienThoai,
        U.gioiTinh,
        SUM(KDT.chiPhi) AS tongTienDieuTri,
        COALESCE(SUM(TT.tienTra), 0) AS tongTienThanhToan,
        HSB.thongTinTongQuan
    FROM UserTable U
    LEFT JOIN KeHoachDieuTri KDT ON U.IDUser = KDT.IDBenhNhan
    LEFT JOIN ThanhToan TT ON KDT.IDKeHoachDieuTri = TT.IDKeHoachDieuTri
    LEFT JOIN HoSoBenhNhan HSB ON U.IDUser = HSB.IDBenhNhan
    WHERE U.IDUser = ?
    GROUP BY
        U.IDUser,
        U.ten,
        U.soDienThoai,
        U.gioiTinh,
        HSB.thongTinTongQuan
    `;

        const result = await db.raw(query, [userID])
        return result;
    } catch (error) {
        console.log("lỗi tìm kiếm user", error)
        return null
    }
}

export const addUserByPhone = async (phone) => {
    try {
        const exists = await db("UserTable").where({ "soDienThoai": phone })
        if (!exists.length) {
            const newUser = await db("UserTable").insert({ soDienThoai: phone })
            return newUser[0]
        }
        return exists[0]
    } catch (error) {
        throw new Error(error)
    }
}

const updateNewUser = async ({ gioiTinh, ten, ngaySinh, email }) => {

}