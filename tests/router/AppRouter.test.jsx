import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock("../../src/hooks/useAuthStore");

describe("Pruebas en el AppRouter", () => {
  const mockcheckAuthToken = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("Debe de mostrar la pantalla de carga y llamar al checkAuthToken", () => {
    useAuthStore.mockReturnValue({
      status: "checking",
      checkAuthToken: mockcheckAuthToken,
    });
    render(<AppRouter />);
    expect(mockcheckAuthToken).toHaveBeenCalled();
    expect(screen.getByText("Cargando...")).toBeTruthy();
  });

  test("Debe de mostrar el login en caso de no estar autenticado.", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockcheckAuthToken,
    });
    render(<AppRouter />);
    screen.debug();
    expect(mockcheckAuthToken).toHaveBeenCalled();
    expect(screen.getByText("Cargando...")).toBeTruthy();
  });
});
