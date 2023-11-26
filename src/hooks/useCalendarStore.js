import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendar-api";
import { parseDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  
  const { events, activeEvent, isLoadingEvents } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent)); 
  }

  const startSavingEvent = async(calendarEvent) => {
    // TODO: llegar al back

    try {
      if ( calendarEvent.id ){
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({...calendarEvent, user }));
        Swal.fire('Evento Actualizado', calendarEvent.title, 'success');
        return;
      }
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
      Swal.fire('Evento Creado', data.event.title, 'success');
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }

    
  }
  const startDeletingEvent = async() => {

    try {
      Swal.fire({
        title: "Quieres eliminar este evento?",
        text: "No puedes revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#8237C8",
        confirmButtonText: "Si, eliminalo!",
        cancelButtonText: "cancelar",
      }).then(async(result) => {
        
        if (result.isConfirmed) {
          try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent());
            Swal.fire({
              title: "Evento eliminado!",
              text: "",
              icon: "success"
            });
          } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
          }
          
        }
      });
      
      
    } catch (error) {
      console.log(error);
    }


  }

  const startLoadingEvents = async() => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = parseDateEvents( data.events );
      dispatch(onLoadEvents(events))
    } catch (error) {
      console.log(error);
    }
  }

  return {
    activeEvent,
    startDeletingEvent,
    isLoadingEvents,
    events,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents,
  }
}