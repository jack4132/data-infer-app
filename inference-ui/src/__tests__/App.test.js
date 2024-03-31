import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import App from "../App";
// import "sample_data_3YVxGbQ.csv";

test("renders upload button initially", () => {
  render(<App />);
  const uploadButton = screen.getByText("Upload");
  expect(uploadButton).toBeInTheDocument();
});

test("renders table after file upload", async () => {
  render(<App />);
  const file = new File(["sample data"], "/sample_data_3YVxGbQ.csv", {
    type: "text/csv",
  });
  console.log(file, "f");
  const input = screen.getByText("Upload");
  fireEvent.change(input, {target: {files: [file]}});

  // Simulate file upload process
  await screen.findByText("Name");
});
