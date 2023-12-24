// Chuẩn hóa số điện thoại Việt Nam
export const normalizePhoneNumber = (phoneNumber) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Kiểm tra xem số điện thoại có đúng 10 chữ số hay không
    if (cleanedPhoneNumber.length === 10) {
        // Thêm mã quốc gia và định dạng số điện thoại
        return `(+84) ${cleanedPhoneNumber.slice(1)}`;
    } else {
        // Trả về số điện thoại không hợp lệ nếu không đúng 10 chữ số
        return 'Số điện thoại không hợp lệ';
    }
};

// Ngược lại, chuyển từ số điện thoại đã chuẩn hóa về số điện thoại gốc
export const reverseNormalizePhoneNumber = (normalizedPhoneNumber) => {
    const cleanedNormalizedPhoneNumber = normalizedPhoneNumber.replace(/\D/g, '');

    if (cleanedNormalizedPhoneNumber.length === 10) {
        return `0${cleanedNormalizedPhoneNumber}`;
    } else {
        // Trả về số điện thoại không hợp lệ nếu không đúng định dạng
        return null;
    }
};

