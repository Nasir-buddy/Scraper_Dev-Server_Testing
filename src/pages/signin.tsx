"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useUser, useSignIn } from "@clerk/nextjs";
import { EmailCodeFactor, SignInFirstFactor } from "@clerk/types";
import { useRouter } from "next/router";
import {
  Button,
  Flex,
  Container,
  Heading,
  Text,
  Link,
  TextField,
  Box,
} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

interface FormData {
  email: string;
}

interface Status {
  message: string;
  isError: boolean;
}

export default function Page() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [formData, setFormData] = useState<FormData>({ email: "" });
  const [status, setStatus] = useState<Status | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittingVerify, setIsSubmittingVerify] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  if (isSignedIn) {
    router.push("/start");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(status, "status before submit");
    setStatus(null);
    console.log(status, "status after submit");

    setIsSubmitting(true);
    if (!isLoaded || !signIn) return;

    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: formData.email,
      });

      const isEmailCodeFactor = (
        factor: SignInFirstFactor
      ): factor is EmailCodeFactor => factor.strategy === "email_code";

      const emailCodeFactor = supportedFirstFactors?.find(isEmailCodeFactor);

      if (emailCodeFactor) {
        const { emailAddressId } = emailCodeFactor;
        await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId,
        });
        setStatus({
          message: "A verification code has been sent to your email.",
          isError: false,
        });
        setVerifying(true);
      }
    } catch (error) {
      setStatus({
        message: "Couldn't find this account, check your email address",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerification(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmittingVerify(true);
    if (!isLoaded || !signIn) return;
    if (!code) {
      setError("Email and verification code are required.");
      setIsSubmittingVerify(false);
      return;
    }

    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });
      // console.log(signInAttempt);
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        setSuccess("Otp verified successfully!");
        router.push("/start");
      } else {
        setError("Invalid verification code. Please try again.");
        return;
      }
    } catch (err) {
      setError("Error validating verification code. Please try again.");
    } finally {
      setIsSubmittingVerify(false);
    }
  }
  async function handleResendOTP() {
    setError("");
    setSuccess("");
    setIsSubmittingVerify(true);

    if (!isLoaded || !signIn) return;

    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: formData.email,
      });

      const isEmailCodeFactor = (
        factor: SignInFirstFactor
      ): factor is EmailCodeFactor => factor.strategy === "email_code";

      const emailCodeFactor = supportedFirstFactors?.find(isEmailCodeFactor);

      if (emailCodeFactor) {
        const { emailAddressId } = emailCodeFactor;
        await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId,
        });
        setSuccess("Verification code resent successfully!");
      }
    } catch (err) {
      setError("Failed to resend verification code. Please try again.");
    } finally {
      setIsSubmittingVerify(false);
    }
  }
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
            <Heading mt="5" mb="5" className="mx-20">
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
                    name="verificationCode"
                    className={`${error ? "w-[70%] mr-6" : "w-full"}`}
                  >
                    <Box mb="2">
                      <Form.Label>Verification Code</Form.Label>
                    </Box>
                    <Form.Control asChild>
                      <TextField.Root
                        id="verificationCode"
                        name="verificationCode"
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
                  <Button type="submit" disabled={isSubmittingVerify || !code}>
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
    <Flex align="center" justify="center" minHeight="100vh" width="100vw">
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
          <Heading size="8" mb="5" className="mx-24">
            Login
          </Heading>
          {status && (
            <Text
              style={{ color: status.isError ? "red" : "green" }}
              mb="3"
              className="mx-24"
            >
              {status.message}
            </Text>
          )}
          <Form.Root onSubmit={handleSubmit} className="mx-24">
            <Flex direction="column" gap="2">
              <Form.Field name="email">
                <Box mb="1">
                  <Form.Label>Email</Form.Label>
                </Box>
                <Form.Control asChild>
                  <TextField.Root
                    type="email"
                    required
                    placeholder="Enter your registered email"
                    variant="surface"
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
                  <Form.Message style={{ color: "red" }} match="typeMismatch">
                    Please enter a valid email
                  </Form.Message>
                </Box>
              </Form.Field>
              <Form.Submit asChild>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ width: "100%" }}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </Form.Submit>
              <Text>
                Don&apos;t have an account? {"  "}
                <Link underline="none" size="3" href="/signup">
                  Sign up
                </Link>
              </Text>
            </Flex>
          </Form.Root>
        </Container>
      </Box>
    </Flex>
  );
}
