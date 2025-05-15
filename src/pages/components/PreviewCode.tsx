import {
  Box,
  Button,
  Card,
  Code,
  Flex,
  Heading,
  ScrollArea,
  Strong,
  Text,
  TextField,
} from "@radix-ui/themes";
import Conpanion from "./Images/Companion";
import StandAlone from "./Images/StandAlone";
import PopUp from "./Images/PopUp";
import PageEmbedded from "./Images/PageEmbedded";
interface PublishingCodeProps {
  title: string;
  description: string;
  iframeCode: string;
}

export function PreviewCode() {
  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      className="h-full w-full p-2"
    >
      <Flex
        align="start"
        direction="column"
        gap="6"
        style={{ backgroundColor: "black" }}
        className="p-4"
      >
        <Flex direction="column" gap="2">
          <Heading>Publishing Code for each placement</Heading>
          <Text>
            Companion is an onsite widget that integrates seamlessly with your
            website
          </Text>
        </Flex>
        <Flex justify="between" width="100%" align="center">
          <Flex
            direction="column"
            justify="center"
            align="center"
            width="50%"
            gap="1"
          >
            <Conpanion />
            <Text as="p" size="3">
              <Strong>Conpanion</Strong>
            </Text>
            <Text>Lorem ipsum dolor sit amet consectetur!</Text>
          </Flex>
          {/* <Box height="300px">Code</Box> */}
          <Flex height="300px" width="50%" direction="column" gap="2">
            <Card className="h-full   bg-[#242424]">
              <Text className="w-full h-full text-white rounded">
                {" "}
                {`<iframe class="jebbit-iframe" src="https://kira.jebbit.com/knot1ufm?L=Full+Page&deferred=true" seamless="true" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="width:100%;min-height:600px;" onload='function embedJebbit(t){function e(t){var e="attach"===t?window.addEventListener:window.removeEventListener;e("DOMContentLoaded",n,!1),e("load",n,!1),e("scroll",n,!1),e("resize",n,!1)}var i=document.querySelector(t);function n(){var t,e,n,o;e=(t=i).getBoundingClientRect(),n=t.clientHeight/2,o=t.clientWidth/2,e.top>=0&&e.left>=0&&e.top<=(window.innerHeight||document.documentElement.clientHeight)</iframe>`}
              </Text>
            </Card>
            <Button className="w-24 ml-auto text-white bg-[#242424]">
              Copy
            </Button>
          </Flex>
        </Flex>
        <Flex justify="between" width="100%" align="center">
          <Flex
            direction="column"
            justify="center"
            align="center"
            width="50%"
            gap="1"
          >
            <PopUp />
            <Text as="p" size="3">
              <Strong>PopUp</Strong>
            </Text>
            <Text>Lorem ipsum dolor sit amet consectetur!</Text>
          </Flex>
          {/* <Box height="300px">Code</Box> */}
          <Flex height="300px" width="50%" direction="column" gap="2">
            <Card className="h-full   bg-[#242424]">
              <Text className="w-full h-full text-white rounded">
                {" "}
                {`<iframe class="jebbit-iframe" src="https://kira.jebbit.com/knot1ufm?L=Full+Page&deferred=true" seamless="true" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="width:100%;min-height:600px;" onload='function embedJebbit(t){function e(t){var e="attach"===t?window.addEventListener:window.removeEventListener;e("DOMContentLoaded",n,!1),e("load",n,!1),e("scroll",n,!1),e("resize",n,!1)}var i=document.querySelector(t);function n(){var t,e,n,o;e=(t=i).getBoundingClientRect(),n=t.clientHeight/2,o=t.clientWidth/2,e.top>=0&&e.left>=0&&e.top<=(window.innerHeight||document.documentElement.clientHeight)</iframe>`}
              </Text>
            </Card>
            <Button className="w-24 ml-auto text-white bg-[#242424]">
              Copy
            </Button>
          </Flex>
        </Flex>
        <Flex justify="between" width="100%" align="center">
          <Flex
            direction="column"
            justify="center"
            align="center"
            width="50%"
            gap="1"
          >
            <PageEmbedded />
            <Text as="p" size="3">
              <Strong>Page Embedded</Strong>
            </Text>
            <Text>Lorem ipsum dolor sit amet consectetur!</Text>
          </Flex>
          {/* <Box height="300px">Code</Box> */}
          <Flex height="300px" width="50%" direction="column" gap="2">
            <Card className="h-full   bg-[#242424]">
              <Text className="w-full h-full text-white rounded">
                {" "}
                {`<iframe class="jebbit-iframe" src="https://kira.jebbit.com/knot1ufm?L=Full+Page&deferred=true" seamless="true" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="width:100%;min-height:600px;" onload='function embedJebbit(t){function e(t){var e="attach"===t?window.addEventListener:window.removeEventListener;e("DOMContentLoaded",n,!1),e("load",n,!1),e("scroll",n,!1),e("resize",n,!1)}var i=document.querySelector(t);function n(){var t,e,n,o;e=(t=i).getBoundingClientRect(),n=t.clientHeight/2,o=t.clientWidth/2,e.top>=0&&e.left>=0&&e.top<=(window.innerHeight||document.documentElement.clientHeight)</iframe>`}
              </Text>
            </Card>
            <Button className="w-24 ml-auto text-white bg-[#242424]">
              Copy
            </Button>
          </Flex>
        </Flex>
        <Flex justify="between" width="100%" align="center">
          <Flex
            direction="column"
            justify="center"
            align="center"
            width="50%"
            gap="1"
          >
            <StandAlone />
            <Text as="p" size="3">
              <Strong>Stand Alone</Strong>
            </Text>
            <Text>Lorem ipsum dolor sit amet consectetur!</Text>
          </Flex>
          {/* <Box height="300px">Code</Box> */}
          <Flex height="300px" width="50%" direction="column" gap="2">
            <Card className="h-full   bg-[#242424]">
              <Text className="w-full h-full text-white rounded">
                {" "}
                {`<iframe class="jebbit-iframe" src="https://kira.jebbit.com/knot1ufm?L=Full+Page&deferred=true" seamless="true" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="width:100%;min-height:600px;" onload='function embedJebbit(t){function e(t){var e="attach"===t?window.addEventListener:window.removeEventListener;e("DOMContentLoaded",n,!1),e("load",n,!1),e("scroll",n,!1),e("resize",n,!1)}var i=document.querySelector(t);function n(){var t,e,n,o;e=(t=i).getBoundingClientRect(),n=t.clientHeight/2,o=t.clientWidth/2,e.top>=0&&e.left>=0&&e.top<=(window.innerHeight||document.documentElement.clientHeight)</iframe>`}
              </Text>
            </Card>
            <Button className="w-24 ml-auto text-white bg-[#242424]">
              Copy
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </ScrollArea>
  );
}
