export default function errorHandler(error) {
  if (error.response) {
    const status = error.response.status;

    if (status === 401) {
      return "Invalid email or password";
    } else if (status === 422) {
      return "Validation error: check your input";
    } else if (status >= 500) {
      return "Server error, try again later";
    } else {
      return "Something went wrong";
    }
  } else {
    return "No response from server";
  }
}
