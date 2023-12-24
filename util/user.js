import { db } from './db'

export const getUser = async (data) => {
    if (data.phone) {

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