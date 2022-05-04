export const verifyAttemptLoginFailure = () => {
  const loginAttemptFailure = Number(
    localStorage.getItem("loginAttemptFailure")
  );

  return loginAttemptFailure >= 5;
};
