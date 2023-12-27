import { db } from './db'

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