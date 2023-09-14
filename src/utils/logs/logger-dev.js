import winston from "winston";
import env from "../../config/enviroment.config.js";

const { combine, timestamp, printf, colorize } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
};
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "blue",
  verbose: "magenta",
  debug: "white",
};

winston.addColors(colors);
