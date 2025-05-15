"use client";
import { useSignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Button,
  Flex,
  Container,
  Heading,
  Box,
  Text,
  Link,
  TextField,
} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useRouter } from "next/router";
interface SignUpRequestBody {
  firstName: string;
  lastName: string;
  email: string;
}
const SignUp: React.FC = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    router.push("/start");
  }

  const [formData, setFormData] = useState<SignUpRequestBody>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [status, setStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittingVerify, setIsSubmittingVerify] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  setStatus(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    if (!formData.email || !formData.firstName || !formData.lastName) {
      setStatus({
        message: "All fields are required.",
        isError: true,
      });
      setIsSubmitting(false);
      return;
    }
    e.preventDefault();
    setStatus(null);

    if (!isLoaded && !signUp) return null;

    try {
      await signUp.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.email,
      });
      await signUp.prepareEmailAddressVerification();
      setVerifying(true);
    } catch (error) {
      setStatus({
        message: "This email is already registered. Please log in to continue.",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  async function handleVerification(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmittingVerify(true);
    setError("");
    setSuccess("");
    if (!code) {
      setError("Verification code is required");
      setIsSubmittingVerify(false);
      return;
    }

    if (!isLoaded && !signUp) return null;

    try {
      const signInAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // console.log(formData);
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        setSuccess("OTP verified successfully!");
        router.push("/start");
      } else {
        // console.error(signInAttempt.);
        setError("Invalid verification code. Please try again.");
        setIsSubmittingVerify(false);
        return;
      }
    } catch (err) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsSubmittingVerify(false);
    }
  }

  const handleResendOTP = async () => {
    setError("");
    setSuccess("");
    setIsSubmittingVerify(true);

    if (!isLoaded && !signUp) return null;

    try {
      await signUp.prepareEmailAddressVerification();
      setSuccess("Verification code resent successfully!");
    } catch (err) {
      setError("Failed to resend verification code. Please try again.");
    } finally {
      setIsSubmittingVerify(false);
    }
  };

  if (verifying) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        minHeight="100vh"
        width="100vw"
      >
        <Box
          width="90%"
          p="6"
          style={{
            maxWidth: "700px",
            border: "1px solid var(--gray-a6)",
            borderRadius: "var(--radius-3)",
          }}
        >
          <Container size="4">
            <Heading size="4" weight="bold" className="mx-20 my-4">
              Verify your account
            </Heading>
            {error && (
              <Text style={{color:"red"}} className="mx-20">
                {error}
              </Text>
            )}
            {success && (
              <Text color="green" className="mx-20">
                {success}
              </Text>
            )}
            <Form.Root onSubmit={handleVerification} className="mx-20">
              <Flex gap="3" direction="column" width="100%">
                <Flex align="end" justify="between">
                  <Form.Field
                    name="code"
                    className={`${error ? "w-[60%] mr-6" : "w-full"}`}
                  >
                    <Box mb="2">
                      <Form.Label>Verification Code</Form.Label>
                    </Box>
                    <Form.Control asChild>
                      <TextField.Root
                        id="code"
                        name="code"
                        type="text"
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </Form.Control>
                  </Form.Field>
                  <Button
                    className="cursor-pointer"
                    variant="surface"
                    hidden={!error}
                    disabled={isSubmittingVerify || !error}
                    onClick={handleResendOTP}
                  >
                    Resend OTP
                  </Button>
                </Flex>
                <Form.Submit asChild>
                  <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={isSubmittingVerify}
                  >
                    Verify
                  </Button>
                </Form.Submit>
              </Flex>
            </Form.Root>
          </Container>
        </Box>
      </Flex>
    );
  }
  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Box
        width="90%"
        p="6"
        style={{
          maxWidth: "700px",
          border: "1px solid var(--gray-a6)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <Container size="3">
          <Heading size="8" className="mx-20 mb-6">
            Sign Up
          </Heading>
          {status && (
            <Text
            style={{ color: status.isError ? "red" : "green" }}
              mb="3"
              className="mx-20"
            >
              {status.message}
            </Text>
          )}
          <Form.Root onSubmit={handleSubmit} className="mx-20">
            <Flex direction="column" gap="2">
              <Form.Field name="firstName">
                <Box mb="1">
                  <Form.Label>First Name</Form.Label>
                </Box>
                <Form.Control asChild>
                  <TextField.Root
                    type="text"
                    required
                    placeholder="Enter your first name"
                    variant="surface"
                    value={formData.firstName}
                    onChange={handleChange}
                    name="firstName"
                    radius="medium"
                    size="3"
                    style={{
                      borderRadius: "4px",
                    }}
                  />
                </Form.Control>
                <Box mt="2">
                  <Form.Message match="valueMissing">
                    Please enter your first name
                  </Form.Message>
                </Box>
              </Form.Field>

              <Form.Field name="lastName">
                <Box mb="1">
                  <Form.Label>Last Name</Form.Label>
                </Box>
                <Form.Control asChild>
                  <TextField.Root
                    type="text"
                    variant="surface"
                    required
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    name="lastName"
                    radius="medium"
                    size="3"
                    style={{
                      borderRadius: "4px",
                    }}
                  />
                </Form.Control>
                <Box mt="2">
                  <Form.Message match="valueMissing">
                    Please enter your last name
                  </Form.Message>
                </Box>
              </Form.Field>

              <Form.Field name="email">
                <Box mb="1">
                  <Form.Label>Email</Form.Label>
                </Box>
                <Form.Control asChild>
                  <TextField.Root
                    type="email"
                    variant="surface"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    radius="medium"
                    size="3"
                  />
                </Form.Control>
                <Box mt="2">
                  <Form.Message match="valueMissing">
                    Please enter your email
                  </Form.Message>
                  <Form.Message  style={{color:"red"}} match="typeMismatch">
                    Please enter a valid email
                  </Form.Message>
                </Box>
              </Form.Field>

              <Form.Submit asChild>
                <Button
                  type="submit"
                  style={{ width: "100%" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
              </Form.Submit>

              {/* <Text align="center" className="flex items-center justify-between w-full px-10">
                Already have an account?{" "}
                <Button variant="surface">
                  <Link underline="none" href="/login">
                    Sign in
                  </Link>
                </Button>
              </Text> */}
              <Text>
                Already have an account?{"  "}
                {/* <Button variant="surface"> */}
                <Link underline="none" size="3" href="/login">
                  Sign in
                </Link>
                {/* </Button> */}
              </Text>
            </Flex>
          </Form.Root>
        </Container>
      </Box>
    </Flex>
  );
};

export default SignUp;
