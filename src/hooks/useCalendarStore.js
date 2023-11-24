import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  
  const { events, activeEvent } = useSelector(state => state.calendar);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent)); 
  }

  const startSavingEvent = async(calendarEvent) => {
    // TODO: llegar al back

    // TODO: Ok
    if ( calendarEvent._id ){
      // actualizando
      dispatch(onUpdateEvent({...calendarEvent}));
    } else {
      // creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  }
  const startDeletingEvent = async() => {
    dispatch(onDeleteEvent());
  }

  return {
    activeEvent,
    startDeletingEvent,
    events,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
  }
}