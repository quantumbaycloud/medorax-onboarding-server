export function notFound(req, res) {
  res.status(404).json({ message: `Route ${req.method} ${req.path} not found.` });
}
export function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ message: 'File is too large.' });
  if (err.name === 'ZodError') return res.status(400).json({ message: 'Validation failed.', errors: err.issues });
  res.status(err.status || 500).json({ message: err.message || 'Internal server error.' });
}
