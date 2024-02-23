function isFirstDateBiggerThanSecond(date1: Date, date2: Date) {
  if (date1 === null || date2 === null) {
    return false;
  }

  return date1.getTime() > date2.getTime();
}

export { isFirstDateBiggerThanSecond };
