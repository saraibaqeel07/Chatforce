import React, { useState } from "react";
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
import { Images } from "../../../assets/images";

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#40E0D0", // Teal color for primary elements
    },
    secondary: {
      main: "#4169E1", // Royal blue for secondary elements
    },
    background: {
      default: "#363B59", // Dark purple/navy background
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#CCCCCC",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#6B7280",
            },
            "&:hover fieldset": {
              borderColor: "#40E0D0",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#40E0D0",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#CCCCCC",
          },
          "& .MuiInputBase-input": {
            color: "#FFFFFF",
          },
        },
      },
    },
  },
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
 

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          position: "relative",
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
            zIndex: 1,
            bgcolor: "rgba(54, 59, 89, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              top: 0,
              left: "-5px",
              position: "absolute",
              zIndex: -1,
            }}
          >
            <img src={Images.leaves} width={"250px"} />
          </Box>
          <Container maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
              }}
            >
              <img src={Images.logo} width={"200px"} />
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mt: "5px", fontSize: "12px" }}
              >
                Fast & Easy Product Management
              </Typography>
            </Box>

            <Typography
              variant="h4"
              component="h1"
              align="center"
              sx={{ mb: 4, fontWeight: "medium", fontSize: "22px" }}
            >
              Welcome Back!
            </Typography>

            <Box component="form" sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Email
              </Typography>
              <TextField
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                margin="normal"
                sx={{
                  mb: 2,
                  fieldset: {
                    outline: "none !important",
                    border: "none !important",
                    borderBottom: "2px solid white !important",
                  },
                  "& .MuiInputBase-input": {
                    padding: "4px !important",
                  },
                }}
                InputProps={{
                  endAdornment: isEmailValid && (
                    <InputAdornment position="end">
                      <CheckCircle color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              {isEmailValid && (
                <Typography
                  variant="caption"
                  sx={{
                    mt: -2,
                    mb: 2,
                    display: "block",
                    color: "primary.main",
                  }}
                >
                  Perfect!
                </Typography>
              )}

              <Typography
                variant="body2"
                sx={{ mt: 2, color: "text.secondary" }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  fieldset: {
                    outline: "none !important",
                    border: "none !important",
                    borderBottom: "2px solid white !important",
                  },
                  "& .MuiInputBase-input": {
                    padding: "4px !important",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: "text.secondary" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography
                variant="caption"
                sx={{ mt: -1, mb: 3, display: "block", color: "primary.main" }}
              >
                Your password is strong
              </Typography>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "medium",
                  borderRadius: 1,
                }}
              >
                Sign in
              </Button>

              <Box sx={{ textAlign: "center", mt: 1 }}>
                <Box sx={{fontSize:"14px"}}>   Forget My Password</Box>
               
              
              </Box>
            </Box>
          </Container>
          <Box
            sx={{
              gap: 2,
              position: "absolute",
              right: -26,
              borderRadius: "8px",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{
                boxShadow: "rgb(61 79 140) 0px 3px 8px",

                bgcolor: "hsl(225.99deg 100% 61.37%)",
                borderRadius: "8px",
                textTransform: "none",
                px: 3,
                py: 1,
                fontSize: "12px",
              }}
            >
              Request An Account
            </Button>
          </Box>
          <Box
            sx={{
              gap: 2,
              position: "absolute",
              right: -26,
              bottom: 37,
              boxShadow: "rgb(251 251 251 / 24%) 0px 3px 8px",
            }}
          >
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 8,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                textAlign: { xs: "center", sm: "left" },
                order: { xs: 2, sm: 1 },
              }}
            >
              <Typography variant="body2" color="text.secondary">
                <Link href="#" underline="hover" color="text.secondary">
                  Term of use
                </Link>
                {" | "}
                <Link href="#" underline="hover" color="text.secondary">
                  Privacy policy
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
