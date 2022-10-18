import { Button, TextField } from '@mui/material';
import { Container, Stack } from '@mui/system';
import {useFormControls} from '../../utils/useFormControls';


const inputFieldValues = [
    {
      name: "fullName",
      label: "Full Name",
      id: "my-name"
    },
    {
      name: "email",
      label: "Email",
      id: "my-email"
    },
    {
      name: "message",
      label: "Message",
      id: "my-message",
      multiline: true,
      rows: 10
    }
  ];


export const ContactForm = () => {
  const {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors
  } = useFormControls();
  return (
    <Container maxWidth="xs">
         <form onSubmit={handleFormSubmit}>
      <Stack flexDirection="column">
      {inputFieldValues.map((inputFieldValue, index) => {
        return (
          <TextField
          sx={{mb:2}}
            key={index}
            onBlur={handleInputValue}
        onChange={handleInputValue}
            name={inputFieldValue.name}
            label={inputFieldValue.label}
            multiline={inputFieldValue.multiline ?? false}
            rows={inputFieldValue.rows ?? 1}
        autoComplete="none"
        {...(errors[inputFieldValue.name] && { error: true, helperText: errors[inputFieldValue.name] })}

          />
        );
      })}
      <Button
        type="submit"
        disabled={!formIsValid()}
      >
        Send Message
      </Button>
      </Stack>
    </form>
    </Container>
   
  )
}