"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const model_1 = require("./digipet/model");
const controller_1 = require("./digipet/controller");
const app = express_1.default();
/**
 * Simplest way to connect a front-end. Unimportant detail right now, although you can read more: https://flaviocopes.com/express-cors/
 */
app.use(cors_1.default());
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Digipet, the totally original digital pet game! Keep your pet happy, healthy and well-disciplined to win the game. If in doubt, check out the /instructions endpoint!",
        description: "Welcome to Digipet, the totally original digital pet game! Keep your pet happy, healthy and well-disciplined to win the game. If in doubt, press the instructions button",
    });
});
app.get("/instructions", (req, res) => {
    if (model_1.getDigipet()) {
        res.json({
            message: "You can check out your digipet's stats with /digipet, and add various actions after that with the /digipet/[action], for actions like walk, train, feed, ignore and hatch. For example, try /digipet/walk to walk a digipet!",
            description: "You can check out your digipet's stats with the digipet button, and add various actions after that with the buttons below, with actions like walk, train, feed, ignore and hatch. For example, try pressing walk to walk a digipet!",
        });
    }
    else {
        res.json({
            message: "You don't have a digipet yet, press hatch to start. You can check out your digipet's stats with /digipet, and add various actions after that with the /digipet/[action], for actions like walk, train, feed, ignore and hatch. For example, try /digipet/walk to walk a digipet! "
        });
    }
});
app.get("/digipet", (req, res) => {
    const digipet = model_1.getDigipet();
    if (digipet) {
        res.json({
            message: "Your digipet is waiting for you!",
            //description: "Your digipet is waiting for you!",
            digipet, // equivalent to digipet: digipet
        });
    }
    else {
        res.json({
            message: "You don't have a digipet yet! Try hatching one with /hatch",
            description: "You don't have a digipet yet! Try hatching one with the hatch button",
            digipet: undefined,
        });
    }
});
app.get("/digipet/hatch", (req, res) => {
    const digipet = model_1.getDigipet();
    if (digipet) {
        res.json({
            message: "You can't hatch a digipet now because you already have one!",
            digipet,
        });
    }
    else {
        const digipet = controller_1.hatchDigipet();
        res.json({
            message: "You have successfully hatched an adorable new digipet. Just the cutest.",
            digipet,
        });
    }
});
app.get("/digipet/ignore", (req, res) => {
    if (model_1.getDigipet()) {
        controller_1.ignoreDigipet();
        res.json({
            message: "ignore your digipet? rude but fine",
            digipet: model_1.getDigipet(),
        });
    }
    else {
        res.json({
            message: "you don't have a digipet to ignore, try hatch one /digipet/hatch",
            description: "you don't have a digipet to ignore, try hatch the hatch button!",
        });
    }
});
app.get("/digipet/feed", (req, res) => {
    if (model_1.getDigipet()) {
        controller_1.feedDigipet();
        res.json({
            message: "feeding time, lets feed your digit pet! yum yum",
            digipet: model_1.getDigipet(),
        });
    }
    else {
        res.json({
            message: "you don't have a digipet to feed, try hatch one /digipet/hatch",
        });
    }
});
app.get("/digipet/train", (req, res) => {
    if (model_1.getDigipet()) {
        controller_1.trainDigipet();
        res.json({
            message: "you have trained your digipet",
            digipet: model_1.getDigipet(),
        });
    }
    else {
        res.json({
            message: "you don't have a digipet to train, try hatching one /digipet/hatch",
        });
    }
});
app.get("/digipet/walk", (req, res) => {
    // check the user has a digipet to walk
    if (model_1.getDigipet()) {
        controller_1.walkDigipet();
        res.json({
            message: "You walked your digipet. It looks happier now!",
            digipet: model_1.getDigipet(),
        });
    }
    else {
        res.json({
            message: "You don't have a digipet to walk! Try hatching one with /digipet/hatch",
        });
    }
});
exports.default = app;
