import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import SignIn from "components/SignInComponent";

test("Button is renderded", () => {
  const { getByText } = render(<SignIn />);
  const linkElement = getByText(/Sign in with Google/i);
  expect(linkElement).toBeInTheDocument();
});

fireEvent.click(screen.getByText(/button/i));