"use client";
import {
  Box,
  Flex,
  Grid,
  Button,
  Text,
  Heading,
} from "@radix-ui/themes";
import React, { useState, useRef } from "react";
import {CopyIcon } from "@radix-ui/react-icons";


const FinalStand = () => {
  const [text, setText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <Flex gap="4" direction="column">
     
      <Box style={{ backgroundColor: "black", padding: "30px", borderRadius: "10px" }}>
        <Grid width="auto">
          <Box
            style={{
              color: "#fff",
              padding: "20px",
              marginBottom: "20px",
              textAlign: "left",
              width: "100%",
            }}
          >
            <Heading
              as="h1"
              size="7"
              style={{
                marginBottom: "10px",
                color: "white",
                fontFamily: "Mulish, sans-serif",
              }}
            >
              Stand Alone Page (Product Related Quiz)
            </Heading>
            <Text size="3" color="gray">
              Lorem ipsum dolor amen set
            </Text>
          </Box>
        </Grid>

        {/* TextArea Wrapper */}
        <Box style={{ position: "relative", marginTop: "20px" }}>
          <textarea
            ref={textAreaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            placeholder="An iframe can be used as the target frame for a link"
            style={{
              width: "95%",
              padding:'20px',  
              backgroundColor: "#101211",
              borderRadius: "8px",
              color: "#fff",
              resize: "vertical",
              border:'none',
              fontSize:'14px'
            }}
          />
          <Box
            onClick={handleCopy}
            style={{
              position: "absolute",
              top: "10px",
              right: "30px",
              backgroundColor: "transparent",
              border:'none'
            }}
          >
            <CopyIcon style={{ color: "#fff" }} />
          </Box>
        </Box>

        <Box style={{ marginTop: "20px" }}>
          <Button
            size="3"
            variant="surface"
            color="gray"
            style={{
              width: "200px",
              backgroundColor: "#3EB489",
              color: "black",
              fontWeight: 600,
            }}
          >
            Add Another Code
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default FinalStand;
