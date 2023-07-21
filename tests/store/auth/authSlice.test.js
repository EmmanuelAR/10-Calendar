import {
  authSlice,
  clearErrorMessage,
  onLogin,
  onLogout,
} from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authStates";
import { testUserCredencials } from "../../fixtures/testUser";

describe("Pruebas sobre el authSlice", () => {
  test("Debe de regresar el estado inicial.", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("Debe de realizar un login.", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredencials));
    expect(state).toEqual({
      status: "authenticated",
      user: {
        email: "test@google.com",
        password: "123456",
        uid: "64b6b256b356a9f162f6586b",
        name: "Test User",
      },
      errorMessage: undefined,
    });
  });

  test("Debe de realizar el logout", () => {
    const errorMessage = "Error";
    const state = authSlice.reducer(initialState, onLogout(errorMessage));
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: errorMessage,
    });
  });

  test("Debe de realizar el clear error message.", () => {
    const errorMessage = "Error";
    const state = authSlice.reducer(initialState, onLogout(errorMessage));
    const newState = authSlice.reducer(state, clearErrorMessage());
    expect(newState.errorMessage).toBe(undefined);
  });
});
