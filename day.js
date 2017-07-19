const events = [ 
    {start: 30, end: 160}, 
    {start: 540, end: 600}, 
    {start: 560, end: 620}, 
    {start: 610, end: 670} ];

day(events);

function seededEvents (e) {
  let events = [];
  let minutesInDay = 60 * 12;

  while (e > 0) {
    let start = Math.floor(Math.random() * minutesInDay)
    let end = start + Math.floor(Math.random() * (minutesInDay - start));
    events.push({start: start, end: end})
    e --;
  }

  return events;
}