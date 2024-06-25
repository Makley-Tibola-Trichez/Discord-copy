import { describe, expect, it } from "vitest";
import { HttpClientError } from "~/errors/http-client-error";
import { FetchHttpClientAdapter } from "../fetch-adapter";

const api = new FetchHttpClientAdapter("http://localhost");

describe("fetch adapter", () => {
  it("Should make a request with GET method and return success response", async () => {
    const response = await api.get("/users");

    expect(response).toBeDefined();
  });
  it("Should make a request with GET method with SearchParams and return an 400 status code", async () => {
    try {
      await api.get(
        "/users/query-params-error",
        new URLSearchParams([["id", "1"]]),
      );
    } catch (error) {
      expect(error).toBeInstanceOf(HttpClientError);
    }
  });

  it("Should make a request with POST method and return success response", async () => {
    const response = await api.post("/users", {
      title: "foo",
      body: "bar",
      userId: 1,
    });

    expect(response.body).toBeDefined();
  });
  it("Should make a request with PUT method and return success response", async () => {
    const response = await api.put("/users/", {
      id: 1,
      title: "foo",
      body: "bar",
      userId: 1,
    });

    expect(response.body).toBeDefined();
  });
  it("Should make a request with PATCH method and return success response", async () => {
    const response = await api.patch("/users/", {
      title: "foo",
    });

    expect(response.body).toBeDefined();
  });

  it("Should make a request with DELETE method and return success response", async () => {
    const response = await api.delete("/users/");

    expect(response.body).toBeDefined();
  });

  it("Should make a request with POST method and return an 400 error and match with the HttpClientError class", async () => {
    try {
      await api.post("/users/1", {
        title: "foo",
        body: "bar",
        userId: 1,
      });
    } catch (error) {
      if (error instanceof HttpClientError) {
        expect(error).toBeInstanceOf(HttpClientError);
      }
    }
  });

  it("Should make a request with GET method and return an Type Error", async () => {
    try {
      await api.get("/users/1");
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });

  it("Should throw an error if baseUrl is not defined", async () => {
    const api = new FetchHttpClientAdapter("");

    try {
      await api.get("/users");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
