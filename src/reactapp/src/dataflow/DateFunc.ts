const compareDateOnly = (date1: string, date2: string) => {
  const _date1 = date1.split("T")[0];
  const _date2 = date2.split("T")[0];
  return _date1.localeCompare(_date2);
};

const numToDateString = (year: number, month: number, day: number) => {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
};

const stringToDate = (date: string) => {
  return new Date(date);
};

const stringToKrString = (date: string) => {
  return dateToKrLocale(stringToDate(date));
};

const dateToKrLocaleWeekday = (date: Date) => {
  return date.toLocaleDateString(
    //KR
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }
  );
};

const dateToKrLocale = (date: Date) => {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formattedTimeslot = (timeslot: string) => {
  const day = timeslot.slice(0, 3);
  const hour = parseInt(timeslot.slice(3)) + 9;
  return `${day}, ${hour}시`;
};

const transferBirth = (birth: string) => {
  if (birth.length === 6) {
    const year = birth.substring(0, 2);
    const month = birth.substring(2, 4);
    const day = birth.substring(4, 6);

    const startYear = parseInt(year, 10);
    const century = startYear >= 0 && startYear <= 22 ? 2000 : 1900;

    const formattedDate = `${century + startYear}-${month}-${day}`;

    return formattedDate;
  }
  return birth;
}

export {
  compareDateOnly,
  numToDateString,
  dateToKrLocaleWeekday,
  dateToKrLocale,
  formattedTimeslot,
  stringToDate,
  stringToKrString,
  transferBirth,
};
