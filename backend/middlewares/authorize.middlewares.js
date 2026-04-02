export const organizer = (req, res, next) => {
    if (req.user && req.user.role === 'organizer') {
      next();
    } else {
      res.status(403).json({ message: 'Not authorized as an organizer' });
    }
  };

export const participant = (req, res, next) => {
  if (req.user && req.user.role === "participant") {
    return next();
  }

  return res.status(403).json({ message: "Not authorized as a participant" });
};