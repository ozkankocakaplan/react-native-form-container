# React Native Form Container

The purpose of this project is to provide a simple and flexible form validation library for React Native applications. With this library, developers can easily implement form validation logic and handle errors in their React Native forms.

📝 [Medium Article](https://medium.com/@ozkankocakaplan07/simple-form-validation-with-react-native-form-container-a198f5fd8597)

## Support the Project

If you would like to support the work I do on this project, you can buy me a coffee through Buy Me a Coffee. Every small contribution will be a big support for the development and sustainability of the project.

[<img src="https://img.shields.io/badge/Donate-Buy%20Me%20a%20Coffee-orange.svg" alt="Buy Me a Coffee" height="50">](https://buymeacoffee.com/ozkankocakaplan)

## How Can You Help?

- ☕️ **Buy Me a Coffee:** You can support by buying a coffee. It's an easy and enjoyable way to contribute to the project.
- ⭐️ **Star Repository:** You can help the project reach more people by starring the repo.
- 👨‍💻 **Contribute:** You can directly contribute to the development of the project by working on it or providing feedback.

## Thank You

Thank you for your support and interest! I need amazing community members like you to continue developing the project.


<img src="https://miro.medium.com/v2/resize:fit:592/format:webp/1*VWxjZQFQ1UP40jEzVH0UIw.gif" alt="react-native basic form validate" width="250">


## Installation

# react-native-form-container

`react-native-form-container` is a simple and customizable form container component for React Native. This library simplifies form validation and manages form elements efficiently.

## Features

- Easy form management
- Flexible and customizable
- Simple validation for form elements

## Installation

To add the `react-native-form-container` library to your project, use the following command:

```sh
npm install react-native-form-container
```

## Usage

Below is an example showing how to use the react-native-form-container library.

## Basic Usage

```sh
import React, { useState, useRef } from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import FormContainer, {   FormContainerRef,   FormInput, } from 'react-native-form-container';


export default function App() {
  const formContainerRef = useRef<FormContainerRef>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <SafeAreaView>
      <FormContainer
        style={{ gap: 10, margin: 10 }}
        formContainerRef={formContainerRef}
      >
        <FormInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          id="firstName"
          required
        />
        <FormInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          id="lastName"
          required
        />
      </FormContainer>
      <Button
        onPress={() => {
          const errorMessages = {
            firstName: "Please enter your first name",
            lastName: "Please enter your last name",
          };
          const result = formContainerRef.current?.validate(errorMessages);
          console.log(result);
        }}
        title="Save"
      />
    </SafeAreaView>
  );
}
```

| PropType         | Description                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| style            | PropTypes.object                                                                                     |
| formContainerRef | PropTypes.oneOfType([ PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) }) ]) |

## Form Validation

To trigger form validation, use the validate method of the form container reference. This method checks the validity of the fields and returns appropriate error messages for invalid fields.

```sh
const result = formContainerRef.current?.validate(errorMessages);
console.log(result);
```

## Error Messages

You can pass error messages as an object to the validate method for each input component. For example:

```sh
const errorMessages = {
  firstName: "Please enter your first name",
  lastName: "Please enter your last name",
};
```

### validate(errorMessages)

Method: `validate(errorMessages: object) -> boolean`

This method validates the validity of inputs in the form.

#### Parameters:

- `errorMessages`: An object. Each key represents an input's identifier (ID), and its value is an error message.

#### Return Value:

- `true`: If all inputs are valid.
- `false`: If at least one input is invalid or the `errorMessages` parameter is not a valid object.

#### Example Usage:

```javascript
const errorMessages = {
  firstName: "Please enter your first name",
  lastName: "Please enter your last name",
};

const result = formContainerRef.current?.validate(errorMessages);
```

## Alternative Input Component

In this example, an alternative input component named `AlternativeInput` is defined. This component accepts props of type `FormInputProps`, which presumably includes properties required by a form input component.

### Usage:

To use `AlternativeInput`, simply pass the necessary props expected by a form input component.

```jsx
import React, { useState, useRef } from "react";
import { View, Text, SafeAreaView, Button, TextInput } from "react-native";
import FormContainer, {
  FormContainerRef,
  FormInputProps,
} from "react-native-form-container";
export default function App() {
  const formContainerRef = useRef < FormContainerRef > null;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const AlternativeInput = (props: FormInputProps) => {
    return (
      <View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            borderRadius: 5,
          }}
          {...props}
        />
        <View style={{ marginTop: 10 }}>
          {props.errorMessage && <Text>{props.errorMessage}</Text>}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <FormContainer
        style={{ gap: 10, margin: 10 }}
        formContainerRef={formContainerRef}
      >
        <AlternativeInput
          id="firstName"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          required
        />
        <AlternativeInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          id="lastName"
          required
        />
      </FormContainer>

      <Button
        onPress={() => {
          const errorMessages = {
            firstName: "Please enter your first name",
            lastName: "Please enter your last name",
          };
          formContainerRef.current?.validate(errorMessages);
        }}
        title="Save"
      />
    </SafeAreaView>
  );
}
```
### FormInputProps

The `FormInput` component accepts the following props:

| Prop              | Type                        | Description                                                                                          |
| ----------------- | --------------------------- | ---------------------------------------------------------------------------------------------------- |
| value             | string                      | The value of the input field.                                                                         |
| onChangeText      | function                    | Callback function to handle text changes.                                                            |
| placeholder       | string                      | Placeholder text for the input field.                                                                 |
| id                | string                      | Unique identifier for the input field. Required for validation.                                       |
| required          | boolean                     | Specifies whether the input field is required. If true, `id` must be provided.                        |
| pattern           | string                      | Regex pattern for input validation. This works only if the `validation` prop is provided.             |
| validation        | oneOf(['email', 'password', 'text', 'phone', 'number']) | Specifies the type of input for predefined validation patterns.                                       |
| passwordOptions   | object                      | Additional options for password validation. See below for details.                                    |

### passwordOptions

When the `validation` prop is set to `password`, the following `passwordOptions` can be specified:

| Option      | Type    | Description                                                                          |
| ----------- | ------- | ------------------------------------------------------------------------------------ |
| minLength   | number  | Minimum length of the password. Default value is 8.                                   |
| special     | boolean | Checks if the password contains special characters.                                   |
| upperCase   | boolean | Checks if the password contains uppercase letters.                                    |
| lowerCase   | boolean | Checks if the password contains lowercase letters.                                    |
| number      | boolean | Checks if the password contains numbers.                                              |

These validation rules are optional but can be specified to enforce stricter password criteria.

