"use client";
import React from "react";
import { Text, Box, Heading, Flex } from "@radix-ui/themes";

export default function Final() {
  return (
    <Box>
      <Box
        style={{
          height: "1000px",
          width: "100%",
          maxWidth: "1310px",
          padding: "30px",
          backgroundColor: "black",
          marginTop: "40px",
          borderRadius: "10px",
        }}
      >
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
            Companion (Product Related Quiz)
          </Heading>
          <Text size="3" color="gray">
            Companion is an onsite widget that integrates seamlessly with your
            website
          </Text>
        </Box>

        <Box
          style={{
            backgroundColor: "#1a1a1a",
            color: "#fff",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            height: "305px",
            width: "100%",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            overflow: "auto",
          }}
        >
          <Text size="5">Preferences</Text>

          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "150px 1fr",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Text size="3" weight="medium">
              Launch
            </Text>
            <Flex style={{ display: "flex", gap: "20px" }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "150px",
                  gap: "5px",
                }}
              >
                <input type="radio" id="closed" name="launch" value="closed" />
                <Text weight="light" style={{ marginTop: "3px" }}>
                  Closed
                </Text>
              </Box>
              <Box
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input type="radio" id="open" name="launch" value="open" />
                <Text weight="light" style={{ marginTop: "3px" }}>
                  Open
                </Text>
              </Box>
            </Flex>

            <Text size="3" weight="medium">
              Position
            </Text>
            <Flex style={{ display: "flex", gap: "20px" }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  width: "150px",
                }}
              >
                <input
                  type="radio"
                  id="bottom_left"
                  name="position"
                  value="bottom_left"
                />
                <Text weight="light" style={{ marginTop: "3px" }}>
                  Bottom Left
                </Text>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  width: "150px",
                }}
              >
                <input
                  type="radio"
                  id="bottom_right"
                  name="position"
                  value="bottom_right"
                />
                <Text weight="light" style={{ marginTop: "3px" }}>
                  Bottom Right
                </Text>
              </Box>
            </Flex>

            {/* Show on */}
            <Text size="3" weight="medium">
              Show on
            </Text>
            <Flex style={{ display: "flex", gap: "20px" }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  width: "150px",
                }}
              >
                <input type="radio" id="all" name="show_on" value="all" />
                <Text weight="light" style={{ marginTop: "3px" }}>
                  All
                </Text>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  width: "150px",
                }}
              >
                <input type="radio" id="mobile" name="show_on" value="mobile" />
                <Text weight="light" style={{ marginTop: "3px" }}>
                  Mobile
                </Text>
              </Box>
              <Box
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="radio"
                  id="desktop"
                  name="show_on"
                  value="desktop"
                />
                <Text weight="light" style={{ marginTop: "3px" }}>
                  Desktop
                </Text>
              </Box>
            </Flex>

            {/* Privacy Policy */}
            <Text size="3" weight="medium">
              Privacy Policy
            </Text>
            <Flex style={{ display: "flex", gap: "20px" }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  width: "150px",
                }}
              >
                <input
                  type="radio"
                  id="supermodel"
                  name="privacy_policy"
                  value="supermodel"
                />
                <Text weight="light" style={{ marginTop: "3px" }}>
                  Supermodel
                </Text>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  width: "150px",
                }}
              >
                <input
                  type="radio"
                  id="custom_url"
                  name="privacy_policy"
                  value="custom_url"
                />
                <Text weight="light" style={{ marginTop: "3px" }}>
                  Custom URL
                </Text>
              </Box>
              <Box
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="radio"
                  id="dont_show"
                  name="privacy_policy"
                  value="dont_show"
                />
                <Text weight="light" style={{ marginTop: "3px" }}>
                  Don&apos;t Show
                </Text>
              </Box>
            </Flex>

            {/* Close Button */}
            <Text size="3" weight="medium">
              Close Button
            </Text>
            <Flex style={{ display: "flex", gap: "20px" }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  width: "150px",
                }}
              >
                <input
                  type="radio"
                  id="hide_bubble_text"
                  name="close_button"
                  value="hide_bubble_text"
                />
                <Text weight="light" style={{ marginTop: "3px" }}>
                  Hide Bubble Text
                </Text>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  width: "150px",
                }}
              >
                <input
                  type="radio"
                  id="hide_companion"
                  name="close_button"
                  value="hide_companion"
                />
                <Text weight="light" style={{ marginTop: "3px" }}>
                  Hide Companion
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>

        <Box
          style={{
            backgroundColor: "#1a1a1a",
            color: "#fff",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            height: "230px",
            width: "100%",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            overflow: "auto",
            marginTop: "30px",
          }}
        >
          <Text size="5">Placement</Text>
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "150px 1fr",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Box
              style={{
                gridColumn: "1 / 2",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input type="radio" id="closed" name="launch" value="closed" />
              <Text weight="light" style={{ marginTop: "3px" }}>
                All pages
              </Text>
            </Box>
            <Box
              style={{
                gridColumn: "2 / 3",
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <Box
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <input type="radio" id="open" name="launch" value="open" />
                <Text weight="light" style={{ marginTop: "3px" }}>
                  Specific URL&apos;s
                </Text>
              </Box>
            </Box>

            <Box
              style={{
                gridColumn: "1 / 2",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text>Logic</Text>
            </Box>
            <Box
              style={{
                gridColumn: "2 / 3",
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <Box
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="radio"
                  id="all_conditions"
                  name="logic"
                  value="all_conditions"
                />
                <Text style={{ marginTop: "3px" }}>
                  All conditions match (and)
                </Text>
              </Box>
              <Box
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="radio"
                  id="any_condition"
                  name="logic"
                  value="any_condition"
                />
                <Text style={{ marginTop: "3px" }}>Any Condition Match</Text>
              </Box>
            </Box>
          </Box>

          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <select
              style={{
                width: "400px",
                padding: "10px",
                fontSize: "16px",
                border: "none",
              }}
            >
              <option value="option1">Contains</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <input
              type="text"
              placeholder="Enter text"
              style={{
                width: "600px",
                padding: "10px",
                fontSize: "16px",
                boxSizing: "border-box",
                border: "none",
              }}
            />
          </Box>
        </Box>

        <Box
          style={{
            backgroundColor: "#1a1a1a",
            color: "#fff",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            height: "220px",
            width: "100%",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            overflow: "auto",
            marginTop: "30px",
          }}
        >
          <Text size="5">Icon Design</Text>
          <Box style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            <Box
              style={{
                width: "100px",
                height: "120px",
                backgroundColor: "black",
              }}
            >
              <Box
                style={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "30px",
                }}
              ></Box>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                flex: "1",
              }}
            >
              <Box
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <label htmlFor="bg-color">Background Color:</label>
                <input
                  type="color"
                  style={{
                    width: "50px",
                    marginLeft: "107px",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                  defaultValue="#FF0000"
                />
              </Box>
              <Box
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <label htmlFor="boldness">Boldness:</label>
                <input
                  type="text"
                  id="boldness"
                  placeholder="60px"
                  style={{
                    width: "80px",
                    height: "30px",
                    marginLeft: "125px",
                    backgroundColor: "black",
                    padding: "6px",
                    border: "none",
                    textAlign: "left",
                  }}
                />
              </Box>
              <Box
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <input
                  type="text"
                  placeholder="Text:- How Can we Help You?"
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "black",
                    border: "none",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}