const data = {
  name: "John Doe ",
  email: "johndoe@example.com",
  password: "Password123!",
  id: 234324,
};

const requiredFields = ["name", "email", "password"];

export function validateRequiredFields(data, requiredFields) {
  for (let i = 0; i < requiredFields.length; i++) {
    requiredFields = requiredFields[i];
    let datasafe = data[requiredFields];
    if (datasafe == "" || datasafe == null) {
      return false;
    }
  }
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
}

export function emailExists(email, data) {}

export function handleError(err, req, res, next) {
  console.error(err);
  if (err.status && err.type && err.message) {
  } else {
    return createError(500, "Error Internal Server ", "message");
  }
}
