import { Button, Stack } from "@mui/material";
import { BoxPaper } from "../Reusable/BoxPaper";
import { TextField } from "../Reusable/TextField";
import { ChangeEvent, useState } from "react";

import { useLoginEmployee } from "../../api/auth/useLoginEmployee";

export default function LoginBox() {
  const [loginCredential, setLoginCredential] = useState("");

  const [password, setPassword] = useState("");

  const loginEmployeeMutation = useLoginEmployee();

  const handleEmployeeLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginEmployeeMutation.mutate({
      loginCredential: loginCredential,
      password: password,
    });
  };

  const handleLoginCredentialChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoginCredential(value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  return (
    <BoxPaper>
      <Stack component="form" noValidate onSubmit={handleEmployeeLogin}>
        <TextField
          text={loginCredential}
          handleChange={handleLoginCredentialChange}
          label="Login credential"
          inputType="text"
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
          disabled={loginEmployeeMutation.isPending || password.length < 1}
        >
          {loginEmployeeMutation.isPending ? `Logging in...` : `Login`}
        </Button>
      </Stack>
    </BoxPaper>
  );
}
