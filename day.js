const events = [ 
    {start: 50, end: 180}, 
    {start: 550, end: 625}, 
    {start: 580, end: 650}, 
    {start: 630, end: 710} ];

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