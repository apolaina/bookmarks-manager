/**
 * Display the full date past this number of days
 */
const DATE_WITH_MONTH_THRESHOLD_IN_DAYS: number = 3;

/**
 * Display "minutes ago" past this number of seconds , else "now"
 */
const NOW_THRESHOLD_IN_SECONDS: number = 30;

/**
 * Display "hours ago" past this number of minutes
 */
const TODAY_AT_THRESHOLD_IN_MINUTES: number = 60;

/**
 * Display "hours ago" past this number of hours, else "today"
 */
const TODAY_AT_THRESHOLD_IN_HOURS: number = 12;

export function timeDiff(a: Date, b: Date) {
  const utc1 = Date.UTC(
    a.getFullYear(),
    a.getMonth(),
    a.getDate(),
    a.getHours(),
    a.getMinutes(),
    a.getSeconds(),
  );
  const utc2 = Date.UTC(
    b.getFullYear(),
    b.getMonth(),
    b.getDate(),
    b.getHours(),
    b.getMinutes(),
    b.getSeconds(),
  );

  let seconds = Math.floor((utc2 - utc1) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export function formatDateToLocale(date: Date) {
  return date.toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDate(a: Date, b: Date = new Date()) {
  const { days, hours, minutes, seconds } = timeDiff(a, b);

  console.log({ days, hours, minutes, seconds });

  if (days > DATE_WITH_MONTH_THRESHOLD_IN_DAYS) {
    return formatDateToLocale(a);
  } else if (days > 0 && days <= DATE_WITH_MONTH_THRESHOLD_IN_DAYS) {
    return `${days} ${days > 1 ? 'days' : 'day'} ago`;
  } else if (seconds < NOW_THRESHOLD_IN_SECONDS && minutes <= 0) {
    return 'now';
  } else if (
    (seconds >= NOW_THRESHOLD_IN_SECONDS &&
      // minutes > 0 &&
      minutes < TODAY_AT_THRESHOLD_IN_MINUTES &&
      hours === 0) ||
    hours === 0
  ) {
    return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`;
  } else if (hours >= TODAY_AT_THRESHOLD_IN_HOURS) {
    return `today`;
  } else if (hours < TODAY_AT_THRESHOLD_IN_HOURS) {
    return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
  }

  return formatDateToLocale(a);
}
