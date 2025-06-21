import { Button, Stack } from "@mui/material";
import { BoxPaper } from "../Reusable/BoxPaper";
import { TextField } from "../Reusable/TextField";
import { ChangeEvent, useState } from "react";

import { useLoginEmployee } from "../../api/auth/useLoginEmployee";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [emailHelper, setEmailHelper] = useState("");

  const [password, setPassword] = useState("");

  const loginEmployeeMutation = useLoginEmployee();

  const handleEmployeeLogin = () => {
    loginEmployeeMutation.mutate({
      email: email,
      password: password,
    });
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!isValidEmail(value)) {
      setEmailError(true);
      setEmailHelper("Invalid email format.");
    } else {
      setEmailError(false);
      setEmailHelper("");
    }
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  return (
    <BoxPaper>
      <Stack>
        <TextField
          text={email}
          handleChange={handleEmailChange}
          label="Email"
          inputType="email"
          isError={emailError}
          errorMessage={emailHelper}
        />
        <TextField
          text={password}
          handleChange={handlePasswordChange}
          label="Password"
          inputType="password"
        />
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          type="submit"
          fullWidth
          onClick={handleEmployeeLogin}
          disabled={
            loginEmployeeMutation.isPending || emailError || password.length < 1
          }
        >
          {loginEmployeeMutation.isPending ? `Logging in...` : `Login`}
        </Button>
      </Stack>
    </BoxPaper>
  );
}
