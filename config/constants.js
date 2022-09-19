var app = {
  APP_NAME: "users",
  success_code: 200,
  forbidden_code: 403,
  bad_request_code: 400,
  server_error_code: 500,
  unauthorized_code: 401,
  token_expired_code: 401,
  login_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjJiMjAyNGEyNzEwMDI5Zjg4MDVkNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjYzMjE4MjM5LCJleHAiOjE2NjMzMDQ2Mzl9.DC0Isa6rGdoJzl1jNcXZ_hX0dRhFvfEbgH3QqvHyDAM",

  server_error: "Oops! Something went wrong",
  token_expired: "Your token is Invalid/expired. Please login again",
  insufficient_parameters: "Insufficient parameters have been passed",
  unauthorize_access: "Unauthorize access",
  unauthorized_url: "You are unauthorized user to access this url"
};

module.exports= app;
