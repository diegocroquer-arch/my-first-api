const { isValidElement, createElement } = require("react");

function validateRequiredFields(data, requiredFields) {
  const missingFields = requiredFields.filter((field) => !data[field]);
  if (missingFields.length > 0) {
    throw new Error(`Faltan campos requeridos: ${missingFields.join(", ")}`);
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
}

function handleError(err, req, res, next) {
  console.error(err);
  if (err.status && err.type && err.message) {
  } else {
    return createError(500, "Error Internal Server ", "message");
  }
}
