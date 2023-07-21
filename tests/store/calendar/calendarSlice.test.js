import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onloadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../fixtures/calendarStates";

describe("Pruebas sobre el calendarSlice", () => {
  test("Debe de regresar el estado inicial", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test("onSetActiveEvent debe de activar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvent debe de agregar el evento", () => {
    const newEvent = {
      id: 3,
      title: "Test event",
      notes: "Test notes",
      start: new Date("2022-10-21 13:00:00"),
      end: new Date("2022-10-21 15:00:00"),
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );
    expect(state.events).toEqual([...events, newEvent]);
  });

  test("onUpdateEvent debe de actualizar el evento", () => {
    const updateEvent = {
      id: 1,
      title: "Evento actulizado",
      notes: "Evento actualizado",
      start: new Date("2022-10-21 13:00:00"),
      end: new Date("2022-10-21 15:00:00"),
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updateEvent)
    );
    expect(state.events).toContain(updateEvent);
  });

  test("onDeleteEvent debe de eliminar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(state.activeEvent);
  });

  test("onLoadEvents debe de establecer los eventos", () => {
    const state = calendarSlice.reducer(initialState, onloadEvents(events));
    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual([...events]);
  });

  test("onLogout debe de limpiar los eventos", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });
});
