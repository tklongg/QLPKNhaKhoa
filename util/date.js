export const convertToSqlDate = (dateString) => {
    // Tạo một đối tượng Date từ chuỗi đầu vào
    const inputDate = new Date(dateString);

    // Kiểm tra xem có phải là một ngày hợp lệ không
    if (isNaN(inputDate.getTime())) {
        console.error('Ngày không hợp lệ.');
        return null;
    }

    const sqlDate = inputDate.toISOString().split('T')[0];

    return sqlDate;
}

export const convertFromSqlDate = (sqlDateString) => {
    const sqlDate = new Date(sqlDateString);

    if (isNaN(sqlDate.getTime())) {
        console.error('Ngày không hợp lệ.');
        return null;
    }

    const formattedDate = sqlDate.toISOString().slice(0, 10);

    return formattedDate;
}

export const convertFromSqlTime = (sqlTimeString) => {
    const sqlDate = new Date(sqlTimeString);

    if (isNaN(sqlDate.getTime())) {
        console.error('Giờ không hợp lệ.');
        return null;
    }

    const formattedTime = sqlDate.toTimeString().slice(0, 5);

    return formattedTime;
}

