export function errorMiddleware(err, req, res, next) {
  console.error(err);
  res.status(err.statusCode || 500).send({ error: err.message });
}
