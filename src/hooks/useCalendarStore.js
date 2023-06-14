import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: backend call

    if (calendarEvent._id) {
      //* Update
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      //* New
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  return {
    //* Propiedades
    events,
    activeEvent,

    //* Métodos
    setActiveEvent,
    startSavingEvent,
  };
};
