export function timeAgo(date: string): string {
    const now = new Date();
    const past = new Date(date.replace('Z', ''));

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