import morgan from "morgan";

function Logger() {
  return morgan(":date[iso] :method :url -> :status :response-time ms");
}

export default Logger;
