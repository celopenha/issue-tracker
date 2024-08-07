import { Children, PropsWithChildren } from "react";
import React from "react";
import { Text } from "@radix-ui/themes";


const ErrorMessage = ({ children }: PropsWithChildren) => {
  return <Text color="red" as="p">
    {children}
  </Text>;
};

export default ErrorMessage;
