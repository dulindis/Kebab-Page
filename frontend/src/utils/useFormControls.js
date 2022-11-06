import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { axiosInstance } from "../configAxios.js";

const initialFormValues = {
    fullName: "",
    email: "",
    message:"",
    formSubmitted: false,
    success: false
  }
  
  export const useFormControls = () => {
    // We'll update "values" as the form updates
    const [values, setValues] = useState(initialFormValues);
    // "errors" is used to check the form for errors
    const [errors, setErrors] = useState({});
    const validate = (fieldValues = values) => {
      let temp = { ...errors }
  
      if ("fullName" in fieldValues)
        temp.fullName = fieldValues.fullName ? "" : "This field is required."
  
      if ("email" in fieldValues) {
        temp.email = fieldValues.email ? "" : "This field is required."
        if (fieldValues.email)
          temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
            ? ""
            : "Email is not valid."
      }
  
      if ("message" in fieldValues)
        temp.message =
          fieldValues.message ? "" : "This field is required."
  
      setErrors({
        ...temp
      });
    }

    const handleInputValue = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value
      });
      validate({ [name]: value });
    };

    // const resetForm = () => {
    //   setState({
    //     name: "",
    //     email: "",
    //     message: "",
    //   });
    // };
  
    // const onInputChange = (event) => {
    //   const { name, value } = event.target;
    //   setState({
    //     ...state,
    //     [name]: value,
    //   });
    // };


    const handleFormSubmit = async (e) => {
      e.preventDefault();
      const toastID = toast.loading("Sending..."
      // , {
      //   position: "bottom-center",
      //   autoClose: 5000,
      // }
      );

      if (formIsValid()) {
        try {
          
          const reply = await axiosInstance.post(`/api/send`, {values});
          console.log(
            'reply',reply
          )
          if (reply.data.sent === false) {
            throw "message not sent";
          }
          toast.update(toastID, {
            render: "Your message has been sucessfully sent.",
            type: "success",
            isLoading: false,
            autoClose: 5000,
            closeOnClick: true,
          });
          // resetForm();
        } catch (error) {
          console.log('error',error)
          toast.update(toastID, {
            render: "Something went wrong.",
            type: "error",
            isLoading: false,
            autoClose: 5000,
            status: error.status,
          });
        }
      }
    };


    const formIsValid = (fieldValues = values) => {
      const isValid =
        fieldValues.fullName &&
        fieldValues.email &&
        fieldValues.message &&
        Object.values(errors).every((x) => x === "");
  
      return isValid;
    };
   return {
      handleInputValue,
      handleFormSubmit,
      formIsValid,
      errors
    };
  }