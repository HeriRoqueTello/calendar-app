import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete, Loading } from "../"
import { getMessagesES, localizer } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents, isLoadingEvents } = useCalendarStore()
  const { openDateModal } = useUiStore();
  const [isMyEvent, setIsMyEvent] = useState(true)
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    
    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );


    const style = {
      backgroundColor: !isMyEvent ? '#465660' : '#6E66BD',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }
    return {
      style
    }
  }
  
  const onDoubleClick = () => {
    openDateModal();
  }
  const onSelect = ( event ) => {
    if( event.user._id === user.uid) {
      setIsMyEvent(true);
    } else {
      setIsMyEvent(false);
    }
    setActiveEvent(event);
  }
  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event);
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <>
      <Navbar />
      
      {
        isLoadingEvents
        ? (
          <Loading height={80} />
        ) : (
          <Calendar
            culture='es'
            localizer={localizer}
            events={events}
            defaultView={lastView}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc(100vh - 80px)' }}
            messages={getMessagesES()}
            eventPropGetter={ eventStyleGetter }
            components={{
              event: CalendarEvent
            }}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelect}
            onView={onViewChanged}
          />
        )
      }

      
      <FabAddNew />
      <FabDelete isMyEvent={!isMyEvent} />
      <CalendarModal />
    </>
  )
}
