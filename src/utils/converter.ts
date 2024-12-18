import dayjs from "dayjs";


export function timeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date.replace("Z", ""));

  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1 && interval < 2) {
    return "1 năm trước";
  }
  if (interval >= 2) {
    return `${interval} năm trước`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1 && interval < 2) {
    return "1 tháng trước";
  }
  if (interval >= 2) {
    return `${interval} tháng trước`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1 && interval < 2) {
    return "1 ngày trước";
  }
  if (interval >= 2) {
    return `${interval} ngày trước`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1 && interval < 2) {
    return "1 giờ trước";
  }
  if (interval >= 2) {
    return `${interval} giờ trước`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1 && interval < 2) {
    return "1 phút trước";
  }
  if (interval >= 2) {
    return `${interval} phút trước`;
  }

  return "vài giây trước";
}

export function toCurrencyAbbreviation(value: number | undefined) {
  if (value) {
    if (value >= 1_000_000) {
      return `${value / 1_000_000}tr`; // Million (triệu) abbreviation
    } else if (value >= 1_000) {
      return `${value / 1_000}k`; // Thousand (nghìn) abbreviation
    }
    return `${value}`; // No abbreviation needed for values less than 1000
  }
}

// Function 2: Convert to currency with thousand separators
export function toCurrencyFormat(value: number | undefined) {
  if (value) return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Adds a dot as a thousands separator
}

export const getStatusLabel = (status: number | undefined): string => {
  switch (status) {
    case 1:
      return "Chưa xử lý";
    case 2:
      return "Đã tiếp nhận";
    case 3:
      return "Đã từ chối";
    default:
      return "Không xác định";
  }
};

export const formatDateTime = (dateString: string | undefined): string => {
  if (dateString) {
    const date = new Date(dateString);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }
  return "";
};

export const formatDate = (dateString: string | undefined): string => {
  if (dateString) {
    const date = new Date(dateString);

    // Format the date to DD-MM-YYYY
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
    return formattedDate;
  }

  return "";
};


export function formatTimestampToDate(timestamp: number): string {
  return dayjs.unix(timestamp).format("DD/MM/YYYY");
}

export const convertToReadableNumber = (num: number): string => {
  const units: { [key: string]: number } = {
    "tỷ": 1_000_000_000,
    "triệu": 1_000_000,
    "nghìn": 1_000,
  };

  for (const [unit, value] of Object.entries(units)) {
    if (num >= value) {
      const result = (num / value).toFixed(1).replace(/\.0$/, ""); // Giữ 1 số thập phân nếu cần
      return `${result} ${unit}`;
    }
  }

  return num.toString(); // Trả về nguyên số nếu không cần chuyển đổi
};
