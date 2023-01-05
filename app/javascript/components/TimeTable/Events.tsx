import React, {useContext} from 'react';
import CourseContext from '../../courseContext';
import { TIME_LIST } from ".";
import {GroupEventState} from '../../courseReducer';

const calculateGridRowValue = (event: GroupEventState) => {
  const position = Math.floor((event.startedMinuteAt - 7 * 60) / 5) + 1
  const span = Math.round((event.endedMinuteAt - event.startedMinuteAt) / 5)
  return `${position} / span ${span}`
}

const calculateTimeDuration = (event: GroupEventState) => {
  const sHour = Math.floor(event.startedMinuteAt/60);
  const sMinute = (event.startedMinuteAt % 60).toString().padStart(2, '0');
  const eHour = Math.floor(event.endedMinuteAt/60);
  const eMinute = (event.endedMinuteAt % 60).toString().padStart(2, '0');
  return `${sHour}:${sMinute}~${eHour}:${eMinute}`
}

const calculateColStartValue = (wday: number) => {
  if(wday === 0) return 'col-start-7';
  return `col-start-${wday}`
}

const Events = () => {
  const [state, ] = useContext(CourseContext)

  return (
    <ol
      className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
      style={{ gridTemplateRows: `repeat(${TIME_LIST.length * 12}, 1fr)` }}
    >
      {
        state.selectedCourseList.map(course => (
          course.events.map(event => (
            <li key={event.id} className={`relative flex mt-px sm:${calculateColStartValue(event.wday)}`} style={{ gridRow: `${calculateGridRowValue(event)}` }}>
            <a
              href="#"
              className="absolute inset-0 flex flex-col p-2 overflow-y-auto text-xs rounded-lg group bg-blue-50 leading-5 hover:bg-blue-100"
            >
              <p className="order-1 font-semibold text-blue-700">{ course.className }</p>
              <p className="text-blue-500 group-hover:text-blue-700">
                { calculateTimeDuration(event) }
              </p>
            </a>
          </li>
        ))
        ))
      }
</ol>
  )
}

export default Events;
