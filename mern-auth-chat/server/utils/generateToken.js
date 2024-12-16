import jwt from "jsonwebtoken";

// A function to generate a JWT and set it as a cookie in the response.
const generateToken = (res, _id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3d",
  });

  // Set the generated token as a cookie in the HTTP response.
  res.cookie("jwt", token, {
    httpOnly: false,
    secure: false,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
  return token
};

export default generateToken;
