import React from "react";
import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
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

  return {
    //* Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
