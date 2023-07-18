import calendarApi from "../../src/api/calendarApi";

describe("Pruebas sobre el CalendarApi", () => {
  test("Debe de tener la configuracion por defecto.", () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("Debe de tener el X-Token de todas las request", async () => {
    const token = "ABC-123-XYZ";
    localStorage.setItem("token", token);
    const res = await calendarApi
      .get("/auth")
      .then((res) => res)
      .catch((res) => res);
    expect(res.config.headers["x-token"]).toBe(token);
  });
});
