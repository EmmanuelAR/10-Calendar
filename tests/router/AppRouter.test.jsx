import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useAuthStore } from "../../src/hooks";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/calendar", () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

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
    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("Debe de mostrar el calendario si estamos autenticado.", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockcheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("CalendarPage")).toBeTruthy();
  });
});
