import {
  PAGE_TIMELINE,
  HOURS_IN_DAY,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  MILLISECONDS_IN_SECOND,
} from "./constants";
import { isPageValid, isNull } from "./validators";

export function normalizePageHash() {
  const page = window.location.hash.slice(1);

  if (isPageValid(page)) {
    return page;
  }

  window.location.hash = PAGE_TIMELINE;

  return PAGE_TIMELINE;
}

export function id() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function normalizeSelectValue(value) {
  return isNull(value) || isNaN(value) ? value : +value;
}

export function generateActivities() {
  return ['Coding', 'Reading', 'Training'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR
  }));
}

export function getTotalActivitySeconds(activity, timelineItems) {
  return timelineItems
    .filter((timelineItem) => timelineItem.activityId === activity.id)
    .reduce((totalSeconds, timelineItem) =>
      Math.round(timelineItem.activitySeconds + totalSeconds)
      , 0)
}

export function generateTimelineItems(activities) {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: [0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3].id : null,
    activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
    /*  activityId: hour % 4 === 0
       ? null
       : activities[hour % 2].id,
     activitySeconds: hour % 4 === 0
       ? 0
       : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR, */
  }));
}

export function generateActivitySelectOptions(activities) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }));
}

export function generatePeriodSelectOptions(periodsInMinutes) {
  return periodsInMinutes.map((periodInMinute) => ({
    value: periodInMinute * SECONDS_IN_MINUTE,
    label: generatePeriodSelectOptionsLabel(periodInMinute),
  }));
}

export function formatSeconds(seconds) {
  const date = new Date();

  date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(":") - 2, utc.indexOf(":") + 6);
}

function generatePeriodSelectOptionsLabel(periodInMinute) {
  const hours = Math.floor(periodInMinute / MINUTES_IN_HOUR).toString().padStart(2, 0);
  const minutes = (periodInMinute % MINUTES_IN_HOUR).toString().padStart(2, 0);

  return `${hours}:${minutes}`;
}