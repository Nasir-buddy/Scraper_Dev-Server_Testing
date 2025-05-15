"use client";
import { Container, Flex, Heading, Text, Button, Box } from "@radix-ui/themes";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import "@radix-ui/themes/styles.css";

import { useRouter } from "next/router";
import { useEffect } from "react";
import {  SignedOut, useAuth } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth(); // Destructure isSignedIn from useAuth

  useEffect(() => {
    if (isSignedIn) {
      router.push("/start");
    }
  }, [isSignedIn, router]);
  const handleLoginClick = () => {
    router.push("/signin");
  };

  const handleSignUpClick = () => {
    router.push("/signup");
  };
  const handleGetStart = () => {
    router.push("/start");
  };

  return (
    <>
      <SignedOut>
        <Box py="2" px="4" style={{ borderBottom: "1px solid var(--gray-a5)" }}>
          <Flex justify="end" align="center">
            <NavigationMenu.Root>
              <NavigationMenu.List
                style={{ listStyle: "none", display: "flex", gap: "16px" }}
              >
                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Button variant="surface" onClick={handleLoginClick}>
                      Login
                    </Button>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                  <NavigationMenu.Link asChild>
                    <Button variant="surface" onClick={handleSignUpClick}>
                      Sign Up
                    </Button>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </Flex>
        </Box>
      </SignedOut>
      <Container size="4" height="100vh">
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{ height: "100%" }}
        >
          <Heading size="9" align="center" mb="4">
            Shoppermodel
          </Heading>
          <Text size="5" align="center" mb="6" style={{ maxWidth: "600px" }}>
            Revolutionize your shopping experience with AI-powered
            recommendations and personalized style insights.
          </Text>
          <Flex gap="4">
            <Button size="3" variant="solid" onClick={handleGetStart}>
              Get Started
            </Button>
            <Button size="3" variant="outline">
              Learn More
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
