function solveRoutes(req, res) {
  const { url, method } = req;

  const validUrl = () =>
    /\/(add|subtract|multiply|divide)\?(\w=-?\d+&)+(\w=-?\d+)$/.test(url);

  if (validUrl() && method === "GET") {
    const args = url
      .slice(url.indexOf("?") + 1)
      .split("&")
      .map((e) => Number(e.slice(e.indexOf("=") + 1)));

    const op = url.slice(url.indexOf("/") + 1, url.indexOf("?"));
    const operations = {
      add: (a, e) => a + e,
      subtract: (a, e) => a - e,
      multiply: (a, e) => a * e,
      divide: (a, e) => a / e,
    };
    const action = operations[op];
    const result = args.reduce(action);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        result: result || "Cannot divide by zero",
        done: true && Boolean(result),
      })
    );
  }

  res.writeHead(400, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ result: "Bad URL", done: false }));
}

module.exports = solveRoutes;
