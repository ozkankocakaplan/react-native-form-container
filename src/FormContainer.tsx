import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { LogBox, View, ViewProps } from "react-native";
import { useTranslation } from "react-i18next";

export interface FormContainerProps extends ViewProps {
  children: ReactNode;
  formId?: string;
  errorMessageField?: string;
  formContainerRef?: MutableRefObject<FormContainerRef | null>;
}

export interface FormContainerRef {
  validate: (errorData?: any) => boolean;
}
LogBox.ignoreLogs([/react-i18next::/]);
export default function FormContainer(props: FormContainerProps) {
  const {
    children: initialChildren,
    formContainerRef,
    formId,
    errorMessageField = "errorMessage",
  } = props;
  const { t } = useTranslation(formId);
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
    let isEmpty = false;
    React.Children.forEach(initialChildren, (child) => {
      if (React.isValidElement(child)) {
        const childProps = { ...child.props };
        if (childProps.id) {
          if (
            (childProps.required && childProps?.value === "") ||
            childProps.value === undefined
          ) {
            isEmpty = true;
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
    let errorFields = {} as any;
    if (props.formId && !errorData) {
      React.Children.forEach(initialChildren, (child) => {
        if (React.isValidElement(child)) {
          const childProps = { ...child.props };
          if (childProps.required && childProps?.id) {
            errorFields[childProps.id] = t(childProps.id);
          }
        }
      });
      setErrors(errorFields);
    } else {
      setErrors(errorData);
    }
  }, []);
  useEffect(() => {
    setChildren(
      React.Children.map(initialChildren, (child) => {
        if (React.isValidElement(child)) {
          const childProps = { ...child.props };

          if (childProps.id) {
            if (childProps.required) {
              let error = errors?.[childProps.id];
              if (
                (childProps?.value === "" || childProps?.value === undefined) &&
                error
              ) {
                if (props.formId) {
                  childProps[errorMessageField] = t(childProps?.id);
                } else {
                  if (error) {
                    childProps[errorMessageField] = error;
                  }
                }
              } else {
                delete childProps[errorMessageField];
              }
            }
            if (childProps.type === "checkbox") {
              if (!childProps.checked) {
                if (props.formId) {
                  childProps[errorMessageField] = t(childProps.id);
                } else {
                  let error = errors[childProps.id];
                  if (error) {
                    childProps[errorMessageField] = error;
                  }
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
