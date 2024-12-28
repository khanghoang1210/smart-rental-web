export const generatePeriods = () => {
    const periods = [];
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
  
    // Nếu ngày >= 20, chuyển đến tháng kế tiếp
    if (currentDay >= 20) {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  
    // Tính từ tháng hiện tại lùi về trước
    while (periods.length < 12) { // Lấy tối đa 12 kỳ
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Tháng từ 0-11, cần +1
      const formattedMonth = month.toString().padStart(2, "0"); // Định dạng 2 chữ số
      periods.push(`${formattedMonth}/${year}`);
  
      // Lùi tháng đi 1
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
  
    return periods;
  };

  