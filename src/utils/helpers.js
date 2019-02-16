// https://github.com/gaearon/overreacted.io/blob/12a2efa78d51e73d2f574ff3521126e986c73208/src/utils/helpers.js
export function formatReadingTime(minutes) {
  const cups = Math.round(minutes / 5)
  return `${new Array(cups || 1).fill('☕️').join('')} ${minutes} min read`
}
