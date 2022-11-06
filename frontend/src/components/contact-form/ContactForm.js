import { Button, TextField } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { useState } from "react";
import { useFormControls } from "../../utils/useFormControls";
import { toast } from "react-toastify";
import axios from "axios";

const inputFieldValues = [
  {
    name: "fullName",
    label: "Full Name",
    id: "my-name",
  },
  {
    name: "email",
    label: "Email",
    id: "my-email",
    autoComplete: "email",
     },
  {
    name: "message",
    label: "Message",
    id: "my-message",
    multiline: true,
    rows: 10,
  },
];

export const ContactForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls();

  // const sendEmail = async (event) => {
  //   const toastID = toast.loading("Sending...", {
  //     position: "bottom-center",
  //     autoClose: 5000,
  //   });

  //   try {
  //     event.preventDefault();
  //     if (state.email === "" || state.name === "" || state.message === "") {
  //       toast.update(toastID, {
  //         render: "Please provide all required fields.",
  //         type: "error",
  //         isLoading: false,
  //         autoClose: 5000,
  //       });
  //       return;
  //     }

  //     const reply = await axios.post(`/api/send`, { ...state });

  //     if (reply.data.sent === false) {
  //       throw "message not sent";
  //     }
  //     toast.update(toastID, {
  //       render: "Your message has been sucessfully sent.",
  //       type: "success",
  //       isLoading: false,
  //       autoClose: 5000,
  //       closeOnClick: true,
  //     });
  //     resetForm();
  //   } catch (error) {
  //     toast.update(toastID, {
  //       render: "Something went wrong.",
  //       type: "error",
  //       isLoading: false,
  //       autoClose: 5000,
  //       status: error.status,
  //     });
  //   }
  // };

  const resetForm = () => {
    setState({
      name: "",
      email: "",
      message: "",
    });
  };

  // const onInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setState({
  //     ...state,
  //     [name]: value,
  //   });
  // };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleFormSubmit}>
        <Stack flexDirection="column">
          {inputFieldValues.map((inputFieldValue, index) => {
            return (
              <TextField
                sx={{ mb: 2 }}
                key={index}
                onBlur={handleInputValue}
                onChange={handleInputValue}
                name={inputFieldValue.name}
                label={inputFieldValue.label}
                multiline={inputFieldValue.multiline ?? false}
                rows={inputFieldValue.rows ?? 1}
                autoComplete="none"
                {...(errors[inputFieldValue.name] && {
                  error: true,
                  helperText: errors[inputFieldValue.name],
                })}
              />
            );
          })}
          <Button type="submit" disabled={!formIsValid()}>
            Send Message
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
