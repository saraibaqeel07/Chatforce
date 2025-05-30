import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
  Paper,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { Visibility, VisibilityOff, CheckCircle } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ApiServices from "../../../services/Apis";

import { showErrorToast, showPromiseToast, showSuccessToast } from "../../../components/Toaster";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { Images } from "../../../assets/images";

// Replace with your actual image paths or imports
// const Images = {
//   logo: "https://via.placeholder.com/200x60?text=Logo",
//   leaves: "https://via.placeholder.com/250x100?text=Leaves",
// };

// Custom theme
const theme = createTheme({
  palette: {
    primary: { main: "#40E0D0" },
    secondary: { main: "#4169E1" },
    background: { default: "#363B59" },
    text: { primary: "#FFFFFF", secondary: "#CCCCCC" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false)

  const { user, setUser } = useContext(AuthContext);


  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setIsLoading(true);
    const obj = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const result = await ApiServices.Login(obj);
      if (result.responseCode == 200) {
        // userLogin(result.data);


        setUser(result?.data);
        localStorage.setItem('user', JSON.stringify(result?.data))
        showSuccessToast(result.message);
        navigate("/dashboard");
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 1000,
            borderRadius: 4,
            p: 4,
            position: "relative",
            bgcolor: "rgba(54, 59, 89, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ position: "absolute", left: "-5px", zIndex: -1,top:-5 }}>
            <img src={Images.leaves} width="250px" alt="Leaves" />
          </Box>

          <Container maxWidth="xs">
            <Box
              sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}
            >
              <img src={Images.logo} width="200px" alt="Logo" />
              <Typography variant="subtitle1" sx={{ fontSize: 12, color: "text.secondary" }}>
                Fast & Easy Product Management
              </Typography>
            </Box>

            <Typography
              variant="h4"
              align="center"
              sx={{ mb: 4, fontWeight: 500, fontSize: 22 }}
            >
              Welcome Back!
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
              {/* Email Field */}
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Email
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  mb: 2,
                  fieldset: {
                    border: "none !important",
                    borderBottom: "2px solid white !important",
                  },
                  "& .MuiInputBase-input": {
                    padding: "4px !important",
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CheckCircle color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password Field */}
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 2 }}>
                Password
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  mb: 2,
                  fieldset: {
                    border: "none !important",
                    borderBottom: "2px solid white !important",
                  },
                  "& .MuiInputBase-input": {
                    padding: "4px !important",
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} sx={{ color: "white" }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Submit Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  borderRadius: 1,
                }}
              >
                Sign In
              </Button>

              {/* <Box sx={{ textAlign: "center", mt: 1 }}>
                <Typography variant="body2" sx={{ fontSize: 14 }}>
                  Forget My Password
                </Typography>
              </Box> */}
            </Box>
          </Container>

          {/* Right-side Buttons */}
          {/* <Box sx={{ position: "absolute", right: -26, top: 16 }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                boxShadow: "rgb(61 79 140) 0px 3px 8px",
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                py: 1,
                fontSize: "12px",
              }}
            >
              Request An Account
            </Button>
          </Box> */}
          <Box sx={{ position: "absolute", right: -26, bottom: 37 }}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 1,
                textTransform: "none",
                color: "black",
                borderColor: "white",
                fontSize: "12px",
                bgcolor: "white",
                "&:hover": {
                  bgcolor: "white",
                  borderColor: "black",
                },
              }}
            >
              Need Help?
            </Button>
          </Box>

          {/* Footer */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="caption" color="text.secondary">
              © 2023 GWS. All rights reserved.
            </Typography>
            <br />
            <Link
              href="#"
              underline="hover"
              sx={{ color: "text.secondary", fontSize: "12px", mt: 1 }}
            >
              Privacy Policy
            </Link>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
