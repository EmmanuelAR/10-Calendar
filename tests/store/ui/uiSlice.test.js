import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from "../../../src/store/ui/uiSlice";

describe("Pruebas sobre el uidSlice", () => {
  test("Debe de regresar el estado por defecto.", () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
  });

  test("Debe de cambiar el isDateModalOpen correctamente", () => {
    let state = uiSlice.getInitialState();
    //* True
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();
    //* False
    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
