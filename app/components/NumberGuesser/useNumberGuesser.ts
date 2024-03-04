import { useState } from "react";

import { useForm } from "react-hook-form";

import { naturalSort } from "app/utilities";

export function useNumberGuesser() {
  const [state, setState] = useState<
    "submitNumber" | "result" | "submitGuess" | "tryAgain" | "correctGuess"
  >("submitNumber");
  const [secretNumber, setSecretNumber] = useState(0);
  const [computerNumber, setComputerNumber] = useState(
    computeRandomNumber(1, 10)
  );
  const [userGuesses, setUserGuesses] = useState<string[]>([]);
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const {
    control,
    handleSubmit: rhfHandleSubmit,
    reset,
    setFocus,
  } = useForm({
    defaultValues: { guess: 0, secretNumber: 0 },
  });

  function computeRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
  }

  const handleSubmit = rhfHandleSubmit(({ guess, secretNumber }) =>
    guess > 0 ? submitGuess(guess) : guessNumber(secretNumber)
  );

  function guessNumber(secretNumber: number) {
    let computerGuess = 0;
    let counter = 0;
    const previousComputerGuesses = [0];

    while (secretNumber !== computerGuess) {
      // Ignore the computerGuess if it was already guessed.
      if (previousComputerGuesses.includes(computerGuess)) {
        computerGuess = computeRandomNumber(1, 1000);
      } else {
        computerGuess = computeRandomNumber(1, 1000);
        counter += 1;
        previousComputerGuesses.push(computerGuess);
      }
    }

    setState("result");
    setSecretNumber(secretNumber);
    setNumberOfGuesses(counter);
  }

  function handleClickNext() {
    setState("submitGuess");
    setSecretNumber(0);
    setNumberOfGuesses(0);
  }

  function submitGuess(guess: number) {
    const stringifiedGuess = guess.toString();

    if (guess !== computerNumber && !userGuesses.includes(stringifiedGuess)) {
      setState("tryAgain");
      setFocus("guess");
      setUserGuesses((previousUserGuesses) =>
        naturalSort([...previousUserGuesses, stringifiedGuess])
      );
    } else {
      setState("correctGuess");
      setUserGuesses([]);
    }

    reset();
  }

  function handleClickPlayAgain() {
    setState("submitNumber");
    setComputerNumber(computeRandomNumber(1, 10));
  }

  return {
    control,
    handleClickNext,
    handleClickPlayAgain,
    handleSubmit,
    numberOfGuesses,
    secretNumber,
    state,
    userGuesses,
  };
}
