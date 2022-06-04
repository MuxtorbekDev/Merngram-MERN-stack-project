module.exports = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) {
    res.status(422).json({ error: "Iltimos ismingiz kiritng!" });
  }
  if (!email) {
    res.status(422).json({ error: "Iltimos emailingiz kiritng!" });
  }
  if (!password) {
    res.status(422).json({ error: "Iltimos Parol kiritng!" });
  }
  next();
};
