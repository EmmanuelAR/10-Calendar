import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onloadEvents,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
      //* Update
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      //* New
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, _id: data.evento.id, user }));
    }
  };

  const startDeletingEvent = () => {
    // TODO: LLEGAR AL BACKEND
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const dataEvents = convertEventsToDateEvents(data.eventos);
      dispatch(onloadEvents(dataEvents));
    } catch (error) {
      console.log("Error al cargar eventos");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
