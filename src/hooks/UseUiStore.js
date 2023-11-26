import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";
import { clearActiveEvent } from "../store/calendar/calendarSlice";

export const useUiStore = () => {
  
  const { isDateModalOpen } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  }
  const closeDateModal = () => {
    dispatch(onCloseDateModal());
    dispatch(clearActiveEvent());
  }


  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
  }
}