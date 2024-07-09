import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { isValidation, checkPasswordOptions } from "./Validation";
import { FormContainerProps } from "react-native-form-container";

export default function FormContainer(props: FormContainerProps) {
  const {
    children: initialChildren,
    formContainerRef,
    errorMessageField = "errorMessage",
  } = props;
  const [children, setChildren] = useState<ReactNode[] | any>(
    React.Children.toArray(initialChildren)
  );
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );
  const checkValidation = useCallback((errorData: any) => {
    handleErrorMessage(errorData);
  }, []);

  const inputCheckValidation = useCallback((): boolean => {
    let isEmpty = true;
    React.Children.forEach(initialChildren, (child) => {
      if (React.isValidElement(child)) {
        const childProps = { ...child.props };
        if (childProps.id) {
          let checkValidation = childProps?.validation;
          if (checkValidation) {
            let result = isValidation(
              childProps?.validation,
              childProps?.value,
              childProps?.passwordOptions
            );
            if (!result) {
              isEmpty = false;
            }
          } else {
            if (
              (childProps.required && childProps?.value === "") ||
              childProps.value === undefined
            ) {
              isEmpty = false;
            }
          }
        }
      }
    });
    return isEmpty;
  }, [initialChildren]);

  useEffect(() => {
    if (formContainerRef) {
      formContainerRef.current = {
        validate: (errorData: any) => {
          checkValidation(errorData);
          return inputCheckValidation();
        },
      };
    }
    return () => {
      if (formContainerRef) {
        formContainerRef.current = null;
      }
    };
  }, [formContainerRef, inputCheckValidation]);

  const handleErrorMessage = useCallback((errorData?: any) => {
    setErrors(errorData);
  }, []);
  useEffect(() => {
    setChildren(
      React.Children.map(initialChildren, (child) => {
        if (React.isValidElement(child)) {
          var childProps = { ...child.props };

          if (childProps.id) {
            if (childProps.required) {
              let error = errors?.[childProps.id];
              let validationCheck = childProps?.validation || "text";

              if (validationCheck) {
                let result = isValidation(
                  childProps?.validation || "text",
                  childProps?.value,
                  childProps?.passwordOptions,
                  childProps?.pattern
                );
                if (!result) {
                  let validation = childProps?.validation || "text";
                  if (validation === "password") {
                    let errorOptions = checkPasswordOptions(
                      childProps?.passwordOptions,
                      childProps?.value,
                      childProps?.id
                    );
                    let findKeyErrorOptions = Object.keys(errorOptions)[0];
                    childProps[errorMessageField] =
                      errors?.[findKeyErrorOptions];
                  } else {
                    if (error) {
                      let validationOrIdErroMessageField =
                        childProps?.value === ""
                          ? error
                          : errors?.[validation] || error
                          ? errors?.[validation] || error
                          : error;

                      childProps[errorMessageField] =
                        validationOrIdErroMessageField;
                    }
                  }
                }
              } else {
                if (
                  (childProps?.value === "" ||
                    childProps?.value === undefined) &&
                  error
                ) {
                  if (error) {
                    childProps[errorMessageField] = error;
                  }
                } else {
                  delete childProps[errorMessageField];
                }
              }
            }
            if (childProps.type === "checkbox") {
              if (!childProps.checked) {
                let error = errors[childProps.id];
                if (error) {
                  childProps[errorMessageField] = error;
                }
              } else {
                delete childProps[errorMessageField];
              }
            }
          } else {
            delete childProps[errorMessageField];
          }
          return React.cloneElement(child, childProps);
        }
        return child;
      })
    );
  }, [initialChildren, errors]);
  return <View {...props}>{children}</View>;
}
