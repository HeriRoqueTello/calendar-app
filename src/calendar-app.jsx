import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/app-router";
import { store } from "./store";

const CalendarApp = () => {
  return ( 
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
   );
}
 
export default CalendarApp;