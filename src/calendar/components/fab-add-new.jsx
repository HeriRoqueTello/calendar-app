import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();


  const addNew = () => {

    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#615AA7',
      user: {
        _id: '123',
        name: 'Heri'
      }
    });
    openDateModal();
  }

  return (
    <button
      onClick={addNew}
      className="btn btn-primary fab"
    >
      <i className="fa fa-plus"></i>
    </button>
  )
}