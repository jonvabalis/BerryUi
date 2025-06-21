import { Button, Stack } from "@mui/material";
import { BoxPaper } from "../Reusable/BoxPaper";
import { TextField } from "../Reusable/TextField";
import { ChangeEvent, useState } from "react";
import { useRegisterEmployee } from "../../api/auth/useRegisterEmployee";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterBox() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState(true);
  const [phoneHelper, setPhoneHelper] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [emailHelper, setEmailHelper] = useState("");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState(true);
  const [passwordHelper, setPasswordHelper] = useState("");

  const registerEmployeeMutation = useRegisterEmployee();
  const handleEmployeeRegister = () => {
    registerEmployeeMutation.mutate(
      {
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
      },
      {
        onSuccess: () => {
          toast.success(
            `${firstName} was registered succesfully! Wait for a confirmation`
          );
          navigate("/login");
        },
      }
    );
  };

  const isValidPassword = (password: string, repeatPassword: string) => {
    return password === repeatPassword && password.length >= 8;
  };

  const isValidPhoneNumber = (phone: string): boolean => {
    return /^\+370\d{8}$/.test(phone);
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
  };
  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
  };
  const handleBirthdayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirthday(value);
  };
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (!isValidPhoneNumber(value)) {
      setPhoneError(true);
      setPhoneHelper("Invalid phone number format. Use +370XXXXXXXX");
    } else {
      setPhoneError(false);
      setPhoneHelper("");
    }
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
    if (!isValidPassword(value, repeatPassword)) {
      setPasswordError(true);
      setPasswordHelper("Passwords do not match or have to be of length >= 8");
    } else {
      setPasswordError(false);
      setPasswordHelper("");
    }
  };
  const handleRepeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepeatPassword(value);
    if (!isValidPassword(password, value)) {
      setPasswordError(true);
      setPasswordHelper("Passwords do not match and have to be of length >= 8");
    } else {
      setPasswordError(false);
      setPasswordHelper("");
    }
  };

  return (
    <BoxPaper>
      <Stack>
        <TextField
          text={firstName}
          handleChange={handleFirstNameChange}
          label="First name"
          inputType="text"
        />
        <TextField
          text={lastName}
          handleChange={handleLastNameChange}
          label="Last name"
          inputType="text"
        />
        <TextField
          text={birthday}
          handleChange={handleBirthdayChange}
          label=""
          inputType="date"
        />
        <TextField
          text={phoneNumber}
          handleChange={handlePhoneNumberChange}
          label="Phone number (+370)"
          inputType="tel"
          isError={phoneError}
          errorMessage={phoneHelper}
        />
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
          isError={passwordError}
          errorMessage={passwordHelper}
        />
        <TextField
          text={repeatPassword}
          handleChange={handleRepeatPasswordChange}
          label="Repeat password"
          inputType="password"
          isError={passwordError}
          errorMessage={passwordHelper}
        />
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
          onClick={handleEmployeeRegister}
          disabled={
            registerEmployeeMutation.isPending ||
            emailError ||
            passwordError ||
            passwordError ||
            firstName.length < 1 ||
            lastName.length < 1 ||
            birthday.length < 1
          }
        >
          {registerEmployeeMutation.isPending ? `Registering...` : `Register`}
        </Button>
      </Stack>
    </BoxPaper>
  );
}
