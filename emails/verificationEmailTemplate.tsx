import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface OTPEmailProps {
  username: string;
  verificationCode: string;
}

export const OTPEmail = ({
  username,
  verificationCode,
}: OTPEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your verification code: {verificationCode}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://via.placeholder.com/150x40?text=LOGO"
              width="150"
              height="40"
              alt="Company Logo"
            />
          </Section>

          <Section style={content}>
            <Heading style={h1}>Verification Code</Heading>
            <Text style={text}>Hi {username},</Text>
            <Text style={text}>
              Please use the following verification code to complete your
              request. This code is valid for 10 minutes.
            </Text>

            <Section style={otpContainer}>
              <Text style={otpText}>{verificationCode}</Text>
            </Section>

            <Text style={securityNote}>
              <strong>Security Note:</strong> If you did not request this code, 
              please ignore this email or contact support if you have concerns.
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              © 2026 Your Company Inc. <br />
              Protecting your account is our top priority.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OTPEmail;

/** * STYLES */

const main = {
  backgroundColor: "#f4f7f9",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "20px 0 48px",
  width: "560px",
  borderRadius: "8px",
  border: "1px solid #e1e4e8",
};

const logoContainer = {
  padding: "20px",
  textAlign: "center" as const,
};

const content = {
  padding: "0 48px",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "600",
  textAlign: "center" as const,
  margin: "20px 0",
};

const text = {
  color: "#4a4a4a",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const otpContainer = {
  background: "#f9f9f9",
  borderRadius: "4px",
  margin: "24px auto",
  width: "280px",
  padding: "12px 0", // Fixed padding here
  textAlign: "center" as const,
  border: "1px dashed #ced4da",
};

const otpText = {
  fontSize: "36px",
  fontWeight: "700",
  letterSpacing: "6px",
  color: "#5F51E8",
  margin: "0",
};

const securityNote = {
  color: "#718096",
  fontSize: "14px",
  lineHeight: "20px",
  marginTop: "24px",
};

const hr = {
  borderColor: "#edf2f7",
  margin: "30px 0",
};

const footer = {
  color: "#a0aec0",
  fontSize: "12px",
  textAlign: "center" as const,
};