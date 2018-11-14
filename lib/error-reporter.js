
// this currently just prints error, but the idea is that is should be able to send SSE errors too
module.exports = function makeErrorReporter () {
  return (err) => {
    console.error(err);
  };
};
