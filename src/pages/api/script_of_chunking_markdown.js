// Import the required modules
const fs = require('fs');
const path = require('path');

// Define the path to the markdown file
const filePath = path.join(__dirname, '../../../public/KB/New-KB-for-agent.md');

// Function to simulate a node object with getContent method
function createNode(content) {
  return {
    getContent: () => content,
  };
}

// Read the markdown file content
const content = fs.readFileSync(filePath, 'utf-8');

// Create a node object from the file content
const node = createNode(content);

// Existing NodeProcessor class
class NodeProcessor {
  constructor() {
    this.headerRegex = /^(#+)\s(.*)/;
  }

  getNodesFromNode(node) {
    // Get the content from the node
    const text = node.getContent({ metadataMode: "NONE" });
    const markdownNodes = [];
    const lines = text.split("\n");
    let currentSection = "";
    const headerStack = [];
    let codeBlock = false;

    lines.forEach((line) => {
      // Track if we're inside a code block to avoid parsing headers in code
      if (line.trim().startsWith("```")) {
        codeBlock = !codeBlock;
        currentSection += line + "\n";
        return;
      }

      // Only parse headers if we're not in a code block
      if (!codeBlock) {
        const headerMatch = this.headerRegex.exec(line);
        if (headerMatch) {
          // Save the previous section before starting a new one
          if (currentSection.trim()) {
            markdownNodes.push(
              this._buildNodeFromSplit(
                currentSection.trim(),
                node,
                headerStack.slice(0, -1).join("/") || ""
              )
            );
          }

          const level = headerMatch[1].length;
          const headerText = headerMatch[2];

          // Pop headers of equal or higher level
          while (headerStack.length && headerStack.length >= level) {
            headerStack.pop();
          }

          // Add the new header
          headerStack.push(headerText);
          currentSection = `${"#".repeat(level)} ${headerText}\n`;
          return;
        }
      }

      currentSection += line + "\n";
    });

    // Add the final section
    if (currentSection.trim()) {
      markdownNodes.push(
        this._buildNodeFromSplit(
          currentSection.trim(),
          node,
          headerStack.slice(0, -1).join("/") || ""
        )
      );
    }

    return markdownNodes;
  }

  _buildNodeFromSplit(content, node, headerPath) {
    // Placeholder function to simulate the behavior of the Python method
    return {
      content,
      node,
      headerPath,
    };
  }
}

// Instantiate the NodeProcessor and process the node
const processor = new NodeProcessor();
const markdownNodes = processor.getNodesFromNode(node);

// Log the processed nodes
console.log(markdownNodes);
const outputFilePath = path.join(__dirname, '../../../public/test-processed-nodes.json');

// Write the processed nodes to a JSON file
fs.writeFileSync(outputFilePath, JSON.stringify(markdownNodes, null, 2), 'utf-8');

console.log(`Processed nodes have been written to ${outputFilePath}`);
module.exports = NodeProcessor;
  
  