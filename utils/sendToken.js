export const sendToken = (res, user, status, message) => {
  const options = {
    httpOnly: true,
    expire: new Date(
      Date.now() + process.env.JWT_TOKEN_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  const token = user.getJWTToken();

  const userData = {
    _id: user.id,
    name: user.name,
    email: user.email,
    avtar: user.avtar,
    task: user.task,
    veryfied: user.veryfied,
  };

  res.status(status).cookie("token", token, options).json({
    success: true,
    message,
    user: userData,
  });
};
