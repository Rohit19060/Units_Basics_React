import "@testing-library/react";
import axios from "axios";

jest.mock("axios");

describe("app", () => {
  test("Checking Api Services", () => {
    const data = [1, 2, 3];
    axios.get.mockResolvedValue({ data: data });
    axios.get("/api/units").then((res) => {
      expect(res.data).toBe(data);
      expect(axios.get.mock.calls).toHaveLength(1);
    });
  });

  test("Add unit Check", () => {
    const data = [1, 2, 3];
    axios.post.mockResolvedValue({ data: data });
    axios
      .post("/api/units", {
        code: "1",
        title: "New Test Title",
        offering: ["S1"],
      })
      .then((res) => {
        expect(res.data).toBe(data);
        expect(axios.get.mock.calls).toHaveLength(1);
      });
  });
});
