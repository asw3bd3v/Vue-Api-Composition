import {
  PAGE_TIMELINE,
  HOURS_IN_DAY,
  MIDNIGHT_HOUR,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
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

export function generateTimelineItems() {
  const timelineItems = [];

  for (let hour = MIDNIGHT_HOUR; hour < HOURS_IN_DAY; hour++) {
    timelineItems.push({
      hour,
      activityId: null,
    });
  }

  return timelineItems;
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

function generatePeriodSelectOptionsLabel(periodInMinute) {
  const hours = Math.floor(periodInMinute / MINUTES_IN_HOUR).toString().padStart(2, 0);
  const minutes = (periodInMinute % MINUTES_IN_HOUR).toString().padStart(2, 0);

  return `${hours}:${minutes}`;
}