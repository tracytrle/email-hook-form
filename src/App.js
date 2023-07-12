import { React, useState } from "react";

import { useForm } from "react-hook-form";
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import {
  FormProvider,
  FTextField,
  FCheckBox,
  FMultiCheckbox,
  FRadioGroup,
  FSelect,
  FSwitch,
} from "./components/form";

// import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

function App() {
  const defaultValues = {
    username: "",
    email: "",
    password: "123",
    remember: true,
    gender: [],
  };

  const methods = useForm({ defaultValues });
  const {
    setError,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setError("afterSubmit", {
      message: "Server Response Error",
    });
    // rules={{required: true}};
  };
  return (
    <div>
      <Typography variant="h3" textAlign="center" mb={3}>
        React Hook Form
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

          <FTextField name="username" label="Username" />
          <FTextField name="email" label="Email address" />
          <FTextField
            name="password"
            label="password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FMultiCheckbox name="gender" options={["male", "female"]} />
          <FRadioGroup name="gender" options={["male", "female"]} />

          <FSelect name="country" label="Country">
            {[
              { code: "VN", label: "Vietname" },
              { code: "CAM", label: "Camnodia" },
            ].map((option) => (
              <option key={option.code} value={option.label}>
                {option.label}
              </option>
            ))}
          </FSelect>
          <FSwitch name="isGoing" label="Is Going" />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FCheckBox name="remember" label="Remember me" />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </FormProvider>
    </div>
  );
}

export default App;
