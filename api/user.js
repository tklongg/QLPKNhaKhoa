import axios from '../util/axios'

export const addUser = ({ soDienThoai, ten, ngaySinh, gioiTinh, email }) => {
    const res = axios.post('/api/user', {
        soDienThoai: soDienThoai,
        ten: ten,
        ngaySinh: ngaySinh,
        gioiTinh: gioiTinh,
        email: email
    })
    return res
}