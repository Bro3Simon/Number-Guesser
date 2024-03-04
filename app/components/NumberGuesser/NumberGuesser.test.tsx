import { render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import {
  CORRECT_GUESS_MESSAGE,
  GUESS_NUMBER_INPUT_NAME,
  NEXT_BUTTON_TEXT,
  NumberGuesser,
  PICK_A_NUMBER_INSTRUCTIONS,
  PLAY_AGAIN_BUTTON_TEXT,
  PLAY_AGAIN_OFFER,
  RESULT_MESSAGE,
  SECRET_NUMBER_INPUT_NAME,
  SUBMIT_BUTTON_TEXT,
  SUBMIT_GUESS_INSTRUCTIONS,
  SUBMIT_GUESS_MESSAGE,
  TRIED_NUMBERS_MESSAGE,
  TRY_AGAIN_MESSAGE,
  WELCOME_MESSAGE,
} from "app/components/NumberGuesser/NumberGuesser";
import * as useNumberGuesserFile from "app/components/NumberGuesser/useNumberGuesser";
import { arrayToCommaSeparatedString } from "app/utilities";

jest.mock("app/components/NumberGuesser/useNumberGuesser", () => ({
  __esModule: true,
  ...jest.requireActual("app/components/NumberGuesser/useNumberGuesser"),
}));

describe("test NumberGuesser", () => {
  describe("test initial state", () => {
    test("renders the welcome message", () => {
      render(<NumberGuesser />);

      expect(screen.getByText(WELCOME_MESSAGE)).toBeInTheDocument();
    });

    test("renders the pick a number instructions", () => {
      render(<NumberGuesser />);

      expect(screen.getByText(PICK_A_NUMBER_INSTRUCTIONS)).toBeInTheDocument();
    });

    test("renders the secret number input", () => {
      render(<NumberGuesser />);

      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "name",
        SECRET_NUMBER_INPUT_NAME,
      );
    });

    test("the secret number input is required", () => {
      render(<NumberGuesser />);

      expect(screen.getByRole("spinbutton")).toHaveAttribute("required");
    });

    test("renders the submit button", () => {
      render(<NumberGuesser />);

      expect(screen.getByRole("button").textContent).toEqual(
        SUBMIT_BUTTON_TEXT,
      );
    });
  });

  describe("test result state", () => {
    test("renders the result message", async () => {
      const user = userEvent.setup();

      const secretNumber = "234";

      render(<NumberGuesser />);

      await user.type(screen.getByRole("spinbutton"), secretNumber);
      await user.click(screen.getByRole("button"));

      expect(screen.getByText(RESULT_MESSAGE[0])).toBeInTheDocument();
      expect(screen.getByText(secretNumber)).toBeInTheDocument();
      expect(screen.getByText(RESULT_MESSAGE[1])).toBeInTheDocument();
      expect(screen.getByText(RESULT_MESSAGE[2])).toBeInTheDocument();
      expect(
        typeof parseInt(
          screen.getByText(RESULT_MESSAGE[2]).nextSibling
            ?.textContent as string,
        ),
      ).toEqual("number");
      expect(screen.getByText(RESULT_MESSAGE[3])).toBeInTheDocument();
    });

    test("renders the next button", async () => {
      const user = userEvent.setup();

      render(<NumberGuesser />);

      await user.type(screen.getByRole("spinbutton"), "234");
      await user.click(screen.getByRole("button"));

      expect(screen.getByRole("button").textContent).toEqual(NEXT_BUTTON_TEXT);
    });
  });

  describe("test submit guess state", () => {
    test("renders the submit guess message", async () => {
      const user = userEvent.setup();

      render(<NumberGuesser />);

      await user.type(screen.getByRole("spinbutton"), "234");
      await user.click(screen.getByRole("button"));
      await user.click(screen.getByRole("button"));

      expect(screen.getByText(SUBMIT_GUESS_MESSAGE)).toBeInTheDocument();
    });

    test("renders the submit guess instructions", async () => {
      const user = userEvent.setup();

      render(<NumberGuesser />);

      await user.type(screen.getByRole("spinbutton"), "234");
      await user.click(screen.getByRole("button"));
      await user.click(screen.getByRole("button"));

      expect(screen.getByText(SUBMIT_GUESS_INSTRUCTIONS)).toBeInTheDocument();
    });

    test("renders the guess number input", async () => {
      const user = userEvent.setup();

      render(<NumberGuesser />);

      await user.type(screen.getByRole("spinbutton"), "234");
      await user.click(screen.getByRole("button"));
      await user.click(screen.getByRole("button"));

      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "name",
        GUESS_NUMBER_INPUT_NAME,
      );
    });

    test("the guess number input is required", async () => {
      const user = userEvent.setup();

      render(<NumberGuesser />);

      await user.type(screen.getByRole("spinbutton"), "234");
      await user.click(screen.getByRole("button"));
      await user.click(screen.getByRole("button"));

      expect(screen.getByRole("spinbutton")).toHaveAttribute("required");
    });

    test("renders the submit button", async () => {
      const user = userEvent.setup();

      render(<NumberGuesser />);

      await user.type(screen.getByRole("spinbutton"), "234");
      await user.click(screen.getByRole("button"));
      await user.click(screen.getByRole("button"));

      expect(screen.getByRole("button").textContent).toEqual(
        SUBMIT_BUTTON_TEXT,
      );
    });
  });

  describe("test try again state", () => {
    const userGuesses = ["1", "4", "7"];

    beforeEach(() => {
      jest.spyOn(useNumberGuesserFile, "useNumberGuesser").mockReturnValue({
        ...renderHook(useNumberGuesserFile.useNumberGuesser).result.current,
        state: "tryAgain",
        userGuesses,
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("renders the try again message", () => {
      render(<NumberGuesser />);

      expect(screen.getByText(TRY_AGAIN_MESSAGE)).toBeInTheDocument();
    });

    test("renders the tried numbers message", () => {
      render(<NumberGuesser />);

      expect(
        screen.getByText(
          `${TRIED_NUMBERS_MESSAGE} ${arrayToCommaSeparatedString(
            userGuesses,
          )}.`,
        ),
      ).toBeInTheDocument();
    });

    test("renders the submit guess instructions", () => {
      render(<NumberGuesser />);

      expect(screen.getByText(SUBMIT_GUESS_INSTRUCTIONS)).toBeInTheDocument();
    });

    test("renders the guess number input", () => {
      render(<NumberGuesser />);

      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "name",
        GUESS_NUMBER_INPUT_NAME,
      );
    });

    test("the guess number input is required", () => {
      render(<NumberGuesser />);

      expect(screen.getByRole("spinbutton")).toHaveAttribute("required");
    });

    test("renders the submit button", () => {
      render(<NumberGuesser />);

      expect(screen.getByRole("button").textContent).toEqual("Submit");
    });
  });

  describe("test correct guess state", () => {
    beforeEach(() => {
      jest.spyOn(useNumberGuesserFile, "useNumberGuesser").mockReturnValue({
        ...renderHook(useNumberGuesserFile.useNumberGuesser).result.current,
        state: "correctGuess",
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("renders the correct guess message", () => {
      render(<NumberGuesser />);

      expect(screen.getByText(CORRECT_GUESS_MESSAGE)).toBeInTheDocument();
    });

    test("renders the play again offer", () => {
      render(<NumberGuesser />);

      expect(screen.getByText(PLAY_AGAIN_OFFER)).toBeInTheDocument();
    });

    test("renders the play again button", () => {
      render(<NumberGuesser />);

      expect(screen.getByRole("button").textContent).toEqual(
        PLAY_AGAIN_BUTTON_TEXT,
      );
    });
  });
});
