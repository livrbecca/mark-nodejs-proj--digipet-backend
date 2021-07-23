import express from "express";
import cors from "cors";
import { getDigipet } from "./digipet/model";
import {
  feedDigipet,
  hatchDigipet,
  ignoreDigipet,
  trainDigipet,
  walkDigipet,
} from "./digipet/controller";

const app = express();

/**
 * Simplest way to connect a front-end. Unimportant detail right now, although you can read more: https://flaviocopes.com/express-cors/
 */
app.use(cors());

// DESCRIPTION WOKS
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Digipet, the totally original digital pet game! Keep your pet happy, healthy and well-disciplined to win the game. If in doubt, check out the /instructions endpoint!",
    description:
      "Welcome to Digipet, the totally original digital pet game! Keep your pet happy, healthy and well-disciplined to win the game. If in doubt, press the instructions button",
  });
});

app.get("/instructions", (req, res) => {
  if (getDigipet()) {
    res.json({
      message:
        "You can check out your digipet's stats with /digipet, and add various actions after that with the /digipet/[action], for actions like walk, train, feed, ignore and hatch. For example, try /digipet/walk to walk a digipet!",
      description:
        "You can check out your digipet's stats with the digipet button, and add various actions after that with the buttons below, with actions like walk, train, feed, ignore and hatch. For example, try pressing walk to walk a digipet!",
    });
  } else {
    res.json({
      message:
        "You don't have a digipet yet, press hatch to start. You can check out your digipet's stats with /digipet, and add various actions after that with the /digipet/[action], for actions like walk, train, feed, ignore and hatch. For example, try /digipet/walk to walk a digipet!",
      description:
        "You don't have a digipet yet, press hatch to start. You can check out your digipet's stats by pressing check digipet and add various actions after that with actions like walk, train, feed, ignore and hatch. For example, press walk to walk a digipet!",
    });
  }
});

// DESCRIPTION WORKS
app.get("/digipet", (req, res) => {
  const digipet = getDigipet();
  console.log("hit digipet endpoint");
  if (digipet) {
    res.json({
      message: "Your digipet is waiting for you!",
      digipet,
    });
  } else {
    res.json({
      message: "You don't have a digipet yet! Try hatching one with /hatch",
      description:
        "You don't have a digipet yet! Try hatching one with the hatch button",
      digipet: undefined,
    });
  }
});

app.get("/digipet/hatch", (req, res) => {
  const digipet = getDigipet();
  if (digipet) {
    res.json({
      message: "You can't hatch a digipet now because you already have one!",
      digipet,
    });
  } else {
    const digipet = hatchDigipet();
    res.json({
      message:
        "You have successfully hatched an adorable new digipet. Just the cutest.",
      digipet,
    });
  }
});

// DESCRIPTION WOKS
app.get("/digipet/ignore", (req, res) => {
  if (getDigipet()) {
    ignoreDigipet();
    res.json({
      message: "ignore your digipet? rude but fine",
      digipet: getDigipet(),
    });
  } else {
    res.json({
      message:
        "you don't have a digipet to ignore, try hatch one /digipet/hatch",
      description:
        "you don't have a digipet to ignore, try hatch the hatch button!",
    });
  }
});

// description doesn't work
app.get("/digipet/feed", (req, res) => {
  if (getDigipet()) {
    feedDigipet();
    res.json({
      message: "feeding time, lets feed your digit pet! yum yum",
      digipet: getDigipet(),
    });
  } else {
    res.json({
      message: "you don't have a digipet to feed, try hatch one /digipet/hatch",
      description: "you don't have a digipet to feed, press the hatch button!",
    });
  }
});

// description doesn't work
app.get("/digipet/train", (req, res) => {
  console.log("hit the train endpoint");
  if (getDigipet()) {
    console.log("if statement: description check");
    trainDigipet();
    res.json({
      message: "you have trained your digipet",
      digipet: getDigipet(),
    });
  } else {
    console.log("else statement: description check");
    res.json({
      message:
        "you don't have a digipet to train, try hatching one /digipet/hatch",
      description: "you don't have a digipet to train, press the hatch button",
    });
  }
});

app.get("/digipet/walk", (req, res) => {
  // check the user has a digipet to walk
  if (getDigipet()) {
    walkDigipet();
    res.json({
      message: "You walked your digipet. It looks happier now!",
      digipet: getDigipet(),
    });
  } else {
    res.json({
      message:
        "You don't have a digipet to walk! Try hatching one with /digipet/hatch",
      description: "you don't have a digipet to walk, press the hatch button",
      digipet: undefined,
    });
  }
});

export default app;
