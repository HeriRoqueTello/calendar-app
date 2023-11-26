import { useCalendarStore } from "../../hooks"

export const FabDelete = ({ isMyEvent }) => {

  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const onDeleteEvent = () => {
    startDeletingEvent();
  }

  return (
    <button
      style={{
        display: hasEventSelected && !isMyEvent ? '' : 'none',
      }}
      onClick={onDeleteEvent}
      className="btn btn-danger fab-danger"
    >
      <i className="fa fa-trash-alt"></i>
    </button>
  )
}