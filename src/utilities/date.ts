// 轉換資料庫的時間戳印跟現在的時間差
export function convertTimeFromMs(time: string) {
  //拿總共的毫秒差距
  let milliseconds = Date.parse(time) - Date.now();
  //相差的日期天數
  const NegativeDays = Math.trunc(milliseconds / 86400000);
  const days = NegativeDays * -1;
  milliseconds = NegativeDays * 86400000 - milliseconds;
  //扣掉天數之後剩下得小時差
  const hours = Math.trunc(milliseconds / 3600000);
  milliseconds = hours * 3600000 - milliseconds;
  return {
    days,
    hours,
  };
}

// 轉換要顯示的格式 => 時間差
// ５天５小時
export function getTimeDiffTransForm(targetTime: string) {
  let displayTime;
  if (targetTime) {
    const { hours, days } = convertTimeFromMs(targetTime);
    if (hours !== 0) {
      displayTime = days === 0 ? hours + "小時" : days + "天" + hours + "小時";
    } else if (hours === 0 && days === 0) {
      displayTime = "就在最近";
    } else if (hours === 0) {
      displayTime = days + "天";
    }
  }
  return displayTime;
}

// 轉換要顯示的格式 => 實際時間點
// 上午 10:05・2021年11月10日
export function getDateTransform(date: string) {
  let hour;
  let result;
  const newDate = new Date(date);
  if (newDate.getHours() - 12 === 0) {
    hour = "下午 12";
  } else if (newDate.getHours() - 12 > 0 && newDate.getHours() - 12 < 12) {
    hour = "下午 " + (newDate.getHours() - 12);
  } else if (newDate.getHours() - 12 < 0) {
    hour = "上午 " + newDate.getHours();
  } else if (newDate.getHours() - 12 === 12) {
    hour = "中午 12";
  }
  if (newDate?.getMonth()) {
    result =
      newDate?.getFullYear() +
      "年" +
      (newDate?.getMonth() + 1) +
      "月" +
      newDate?.getDate() +
      "日 · " +
      hour +
      ":" +
      newDate?.getMinutes().toString().padStart(2, "0"); // 強制加到兩位數
  }
  return result;
}

// 去掉時分秒
export function getUploadDate(date: string) {
  return getDateTransform(date)
    ?.substring(0, getDateTransform(date)?.indexOf("·"))
    .trim();
}
