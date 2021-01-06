import React from "react";
import ReactDOM from "react-dom";
import { NotFound } from "../index";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NotFound />, div);
});

it("renders text correctly", () => {
  const { getByTestId } = render(<NotFound text="Hello world" />);
  expect(getByTestId("not-found")).toHaveTextContent("Hello world");
});

it("renders text correctly", () => {
  const { getByTestId } = render(<NotFound text="Hello Test 2" />);
  expect(getByTestId("not-found")).toHaveTextContent("Hello Test 2");
});
