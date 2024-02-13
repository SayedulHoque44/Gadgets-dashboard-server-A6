const currentTime = new Date(); //2024-01-27T13:28:57.215Z

export const Daily = () => {
  const $gt = new Date(
    currentTime.getFullYear(), //2024
    currentTime.getMonth(), //month date
    currentTime.getDate() //27 -> month day -> jannury 27
  ); //2024-01-26T18:00:00.000Z -> its 27 date but giving 26
  const $lte = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate() + 1
  );
  return { $gt, $lte };
};
export const Weekly = () => {
  const $gt = new Date(
    currentTime.getFullYear(), //2024
    currentTime.getMonth(),
    currentTime.getDate() - currentTime.getDay()
  );
  const $lte = new Date(
    currentTime.getFullYear(), //2024
    currentTime.getMonth(),
    currentTime.getDate() + 1
  );
  return { $gt, $lte };
};

export const Monthly = () => {
  const $gt = new Date(
    currentTime.getFullYear(), //2024
    currentTime.getMonth(),
    1 //start from month first date
  ); //but it will give before 1 day of start month
  const $lte = new Date(
    currentTime.getFullYear(), //2024
    currentTime.getMonth(),
    currentTime.getDate() + 1 //28 -> month day -> jannury 28 -> sum 1 cz output of this give before one day
  ); //2024-01-27T18:00:00.000Z -> its 27 date but giving 26
  return { $gt, $lte };
};

export const Yearly = () => {
  const $gt = new Date(
    currentTime.getFullYear(), //2024
    0,
    1 //start from month first date
  ); //but it will give before 1 day of start month
  const $lte = new Date(
    currentTime.getFullYear(), //2024
    currentTime.getMonth(), //current month
    currentTime.getDate() + 1
  ); //2024-01-27T18:00:00.000Z -> its 27 date but giving 26
  return { $gt, $lte };
};
// console.log(Daily())
// console.log(Weekly())
// console.log(Monthly())
// console.log(Yearly())
