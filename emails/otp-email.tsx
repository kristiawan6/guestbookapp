import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OtpEmailProps {
  otp: string;
}

export const OtpEmail = ({ otp }: OtpEmailProps) => (
  <Html>
    <Head />
    <Preview>Your OTP for password reset</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Your OTP for password reset</Heading>
        <Text style={text}>
          Your One-Time Password (OTP) for resetting your password is:
        </Text>
        <Text style={otpText}>{otp}</Text>
        <Text style={text}>
          This OTP is valid for 10 minutes. If you did not request this, please
          ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default OtpEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "20px",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #dfe3e8",
  borderRadius: "3px",
  padding: "20px",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "16px",
  lineHeight: "24px",
};

const otpText = {
  ...text,
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "20px 0",
};