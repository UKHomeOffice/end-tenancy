// export function convertDateWithOrdinalSuffix(date: string): string {
//   const [dayRaw, monthRaw, yearRaw] = date.split('/').map(v => Number(v));
//   const parsed = new Date(Date.UTC(yearRaw, monthRaw - 1, dayRaw));

//   if (Number.isNaN(parsed.getTime())) {
//     throw new Error(`Invalid date provided: ${date}`);
//   }

//   const day = parsed.getUTCDate();
//   const monthYear = parsed.toLocaleString('en-GB', {
//     month: 'long',
//     year: 'numeric',
//     timeZone: 'UTC',
//   });

//   return `${day}${getOrdinal(day)} ${monthYear}`;
// }

// function getOrdinal(day: number): string {
//   if (day >= 11 && day <= 13) {
//     return 'th';
//   }

//   switch (day % 10) {
//     case 1:
//       return 'st';
//     case 2:
//       return 'nd';
//     case 3:
//       return 'rd';
//     default:
//       return 'th';
//   }
// }
