# React Native Form Container

The purpose of this project is to provide a simple and flexible form validation library for React Native applications. With this library, developers can easily implement form validation logic and handle errors in their React Native forms.

## Support the Project

If you would like to support the work I do on this project, you can buy me a coffee through Buy Me a Coffee. Every small contribution will be a big support for the development and sustainability of the project.

[<img src="https://img.shields.io/badge/Donate-Buy%20Me%20a%20Coffee-orange.svg" alt="Buy Me a Coffee" height="50">](https://buymeacoffee.com/ozkankocakaplan)

## How Can You Help?

- ☕️ **Buy Me a Coffee:** You can support by buying a coffee. It's an easy and enjoyable way to contribute to the project.
- ⭐️ **Star Repository:** You can help the project reach more people by starring the repo.
- 👨‍💻 **Contribute:** You can directly contribute to the development of the project by working on it or providing feedback.

## Thank You

Thank you for your support and interest! I need amazing community members like you to continue developing the project.

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
        formId="addStudentForm"
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
| formId           | PropTypes.string                                                                                     |
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
