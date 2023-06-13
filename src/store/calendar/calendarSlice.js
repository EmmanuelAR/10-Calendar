import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
  title: "Cumple jefe",
  notes: "falta todo",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafa",
  user: {
    _id: "123",
    name: "Emmanuel",
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
  },
});
export const { onSetActiveEvent } = calendarSlice.actions;
