const heightofContainer = 720;
const widthOfContainer = 600;
const minutes = 60 * 12;
let eventsPerTimeSlot = [];
let width = [];
let leftish = [];


var makeEvent = (height, top, left, units) => {

  let event = document.createElement("DIV");
  event.className = "event";
  event.innerHTML = 
  "<span class='title'> Sample Item </span> \
  <br><span class='location'> Sample Location </span>";

  
  event.style.width = (widthOfContainer/units) + "px";
  event.style.height = height + "px";
  event.style.top = top + "px";
  event.style.left = 100 + left + "px";

  document.getElementById("events").appendChild(event);
}

function getEventsPerTimeSlot (events) {
  eventsPerTimeSlot = [];

  for (var i = 0; i < 24; i ++) {
    var time = [];
    for (var l = 0; l < events.length; l++) {
      time.push(0);
    }
    eventsPerTimeSlot.push(time);
  }

  events.forEach((event, id) => {
    let end = event.end;
    let start = event.start;
    let sort = 1;

    while (start < end) {
      timeRange = Math.floor(start/30);

      while (sort < events.length) {
        if (eventsPerTimeSlot[timeRange].indexOf(sort) === -1) {
          break;
        }
        sort ++;
      }

      eventsPerTimeSlot[timeRange][id] = sort;
      start = start + 30;
    }

    eventsPerTimeSlot[Math.floor((end-1)/30)][id] = sort;
  });
};



function details (events) {


  width = [];
  leftish = [];

  for (var i = 0; i < events.length; i++) {
    width.push(0);
    leftish.push(0);
  }

  eventsPerTimeSlot.forEach((timePeriod) => {

    let numberOfEvents = timePeriod.reduce((event1, event2) => {
      return event2 ? event1 + 1 : event1;
    })

    if (numberOfEvents > 1) {
      timePeriod.forEach((event, id) => {
        if (timePeriod[id]) {
          if (numberOfEvents > width[id]) {
            width[id] = numberOfEvents;
          }
        }

        if (timePeriod[id] && !leftish[id]) {
          leftish[id] = timePeriod[id];
        }
      })
    }
  });
};

var day = (events) => {


var myevent = document.getElementById("events");
myevent.innerHTML = '';

  getEventsPerTimeSlot(events);
  details(events);

  events.forEach((event, id) => {
    let height = (event.end - event.start) / minutes * heightofContainer;
    let top = event.start / minutes * heightofContainer; 
    let end = event.end;
    let start = event.start;
    let units = width[id];
    if (!units) {units = 1};
    let left = (widthOfContainer / width[id]) * (leftish[id] - 1) + 10;
    if (!left || left < 0) {left = 10};
    makeEvent(height, top, left, units);
  });
}

