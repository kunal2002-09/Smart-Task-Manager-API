const isValidDate = (value) => !Number.isNaN(Date.parse(value));

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password is required and must be at least 6 characters'
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  next();
};

const validateTaskCreate = (req, res, next) => {
  const { title, status, dueDate } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }

  if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Status must be one of pending, in-progress, completed'
    });
  }

  if (!dueDate || !isValidDate(dueDate)) {
    return res.status(400).json({ success: false, message: 'A valid dueDate is required' });
  }

  next();
};

const validateTaskUpdate = (req, res, next) => {
  const { title, status, dueDate } = req.body;

  if (title !== undefined && (!title || typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ success: false, message: 'Title, if provided, cannot be empty' });
  }

  if (status !== undefined && !['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Status must be one of pending, in-progress, completed'
    });
  }

  if (dueDate !== undefined && !isValidDate(dueDate)) {
    return res.status(400).json({ success: false, message: 'dueDate must be a valid date' });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateTaskCreate,
  validateTaskUpdate
};
