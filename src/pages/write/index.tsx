import { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactTooltip from "react-tooltip";
import {
  Box,
  Button,
  TextArea,
  TextField,
  Flex,
  Dialog,
  VisuallyHidden,
  Select,
} from "@radix-ui/themes";
import { DialogTitle } from "@radix-ui/react-dialog";

interface FollowUpQuestion {
  id: string;
  question: string;
  answer: string;
  isExpanded: boolean;
}

interface Optimization {
  id: string;
  description: string;
}

interface FollowUpOptimization {
  id: string;
  question: string;
  answer: string;
  isExpanded: boolean;
}

interface Keyword {
  keyword: string;
  detail: string;
  context: string;
}

interface AlertData {
  id: string;
  title: string;
  description: string;
  isExpanded: boolean;
  followUpQuestions: FollowUpQuestion[];
  optimizations: Optimization[];
  followUpOptimizations: FollowUpOptimization[];
  keywords: Keyword[];
}

const AddForm = () => {
  const [alertData, setAlertData] = useState<AlertData>({
    id: "",
    title: "",
    description: "",
    isExpanded: false,
    followUpQuestions: [],
    optimizations: [],
    followUpOptimizations: [],
    keywords: [],
  });

  const [followUpQuestion, setFollowUpQuestion] = useState<FollowUpQuestion>({
    id: "",
    question: "",
    answer: "",
    isExpanded: false,
  });

  const [optimization, setOptimization] = useState<Optimization>({
    id: "",
    description: "",
  });

  const [followUpOptimization, setFollowUpOptimization] =
    useState<FollowUpOptimization>({
      id: "",
      question: "",
      answer: "",
      isExpanded: false,
    });

  const [keyword, setKeyword] = useState<Keyword>({
    keyword: "",
    detail: "",
    context: "",
  });

  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [formData, setFormData] = useState({
    keyword: "",
    description: "",
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isFollowUpDialogOpen, setIsFollowUpDialogOpen] = useState(false);
  const [isOptimizationDialogOpen, setIsOptimizationDialogOpen] =
    useState(false);
  const [
    isFollowUpOptimizationDialogOpen,
    setIsFollowUpOptimizationDialogOpen,
  ] = useState(false);

  const [keywordsList, setKeywordsList] = useState<Keyword[]>([]);

  const [markdownDetail, setMarkdownDetail] = useState<string>("");

  const handleSave = async () => {
    const dataToSave = {
      ...alertData,
      description: markdownDetail,
    };

    console.log("Data to Save:", dataToSave);

    setAlertData({
      id: "",
      title: "",
      description: "",
      isExpanded: false,
      followUpQuestions: [],
      optimizations: [],
      followUpOptimizations: [],
      keywords: [],
    });

    setMarkdownDetail("");

    // try {
    //   const response = await fetch("/api/saveToJson", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(dataToSave),
    //   });
    //   if (response.ok) {
    //     console.log("Data saved successfully");
    //   }
    // } catch (error) {
    //   console.error("Error saving data:", error);
    // }
    console.log(dataToSave);
  };

  const handleAddFollowUpQuestion = () => {
    setAlertData((prev) => ({
      ...prev,
      followUpQuestions: [...prev.followUpQuestions, followUpQuestion],
    }));
    setFollowUpQuestion({
      id: "",
      question: "",
      answer: "",
      isExpanded: false,
    });
  };

  const handleAddOptimization = () => {
    setAlertData((prev) => ({
      ...prev,
      optimizations: [...prev.optimizations, optimization],
    }));
    setOptimization({ id: "", description: "" });
  };

  const handleAddFollowUpOptimization = () => {
    setAlertData((prev) => ({
      ...prev,
      followUpOptimizations: [
        ...prev.followUpOptimizations,
        followUpOptimization,
      ],
    }));
    setFollowUpOptimization({
      id: "",
      question: "",
      answer: "",
      isExpanded: false,
    });
  };

  const handleAddKeyword = async () => {
    const keywordWithContext = {
      ...keyword,
      context: keyword.context || alertData.id,
    };

    setAlertData((prev) => ({
      ...prev,
      keywords: [...prev.keywords, keywordWithContext],
    }));

    setKeyword({
      keyword: "",
      detail: "",
      context: "",
    });

    try {
      const response = await fetch("/api/saveToKeywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(keywordWithContext),
      });
      if (response.ok) {
        console.log("Keyword saved successfully");
      }
    } catch (error) {
      console.error("Error saving keyword:", error);
    }
  };

  const [prebuildWord, setPrebuildWord] = useState<string>("");

  // const handleSearchKeyword = async () => {
  //   try {
  //     const response = await fetch("/api/searchKeyword", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ keyword: prebuildWord }),
  //     });
  //     const data = await response.json();

  //     if (data.found) {
  //       setKeyword({
  //         keyword: data.keyword,
  //         detail: data.detail,
  //         context: data.context,
  //       });
  //       setFormData({
  //         keyword: data.keyword,
  //         description: data.detail,
  //       });
  //     } else {
  //       console.log("Keyword not found");
  //     }
  //   } catch (error) {
  //     console.error("Error searching keyword:", error);
  //   }
  // };

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await fetch("/api/getKeywords");
        const data = await response.json();
        setKeywordsList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching keywords:", error);
        setKeywordsList([]);
      }
    };

    fetchKeywords();
  }, []);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescription = e.target.value;
    setAlertData((prev) => ({ ...prev, description: newDescription }));
    setMarkdownDetail(newDescription);
  };

  const handleEditorChange = ({ text }: { text: string }) => {
    setMarkdownDetail(text);
  };

  return (
    <Box
      p="6"
      style={{
        display: "flex",
        height: "100vh",
        position: "relative",
      }}
    >
      <Button
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
        onClick={() => setIsPreviewOpen(true)}
      >
        Preview
      </Button>

      <Dialog.Root open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <Dialog.Content
          style={{
            width: "80vw",
            height: "80vh",
            maxWidth: "none",
            maxHeight: "none",
            margin: "auto",
            overflowY: "auto",
          }}
        >
          <VisuallyHidden>
            <DialogTitle>Preview</DialogTitle>
          </VisuallyHidden>
          <Box p="4">
            <h3 className="text-2xl font-bold mb-4">Preview</h3>
            <div className="text-2xl font-bold mb-4">{alertData.title}</div>
            <div className="mb-4">{alertData.description}</div>
            <div className="mb-4">
              <ReactMarkdown>{markdownDetail}</ReactMarkdown>
            </div>
            <div>
              <h4 className="text-2xl font-bold mt-4">Follow-up Questions</h4>
              <ul>
                {alertData.followUpQuestions.map((question, index) => (
                  <li key={index} className="mb-2">
                    <strong>{question.question}</strong> <br />
                    {question.answer}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-bold mt-4">Optimizations</h4>
              <ul>
                {alertData.optimizations.map((optimization, index) => (
                  <li key={index} className="mb-2">
                    {optimization.description}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-bold mt-4">
                Follow-up Optimizations
              </h4>
              <ul>
                {alertData.followUpOptimizations.map((opt, index) => (
                  <li key={index} className="mb-2">
                    <strong>{opt.question}</strong> <br />
                    {opt.answer}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-bold mt-4">Keywords</h4>
            
            </div>
            <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
          </Box>
        </Dialog.Content>
      </Dialog.Root>

      <Flex
        direction="column"
        gap="3"
        style={{
          width: "50%",
          padding: "20px",
          borderRight: "2px solid #ccc",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <label className="text-xl font-bold">Alert Name</label>
        <TextField.Root
          placeholder="Enter ID..."
          value={alertData.id}
          onChange={(e) => setAlertData({ ...alertData, id: e.target.value })}
        />
        <label className="text-xl font-bold">Title</label>
        <TextField.Root
          placeholder="Enter title..."
          value={alertData.title}
          onChange={(e) =>
            setAlertData({ ...alertData, title: e.target.value })
          }
        />
        <label className="text-xl font-bold">Description</label>
        <TextArea
          placeholder="Enter description..."
          style={{ height: "150px" }}
          value={alertData.description}
          onChange={handleDescriptionChange}
        />
        <label className="text-xl font-bold">Detail (markdown)</label>
        <MdEditor
          style={{ height: "150px" }}
          value={markdownDetail}
          renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
          onChange={handleEditorChange}
        />
        <Flex gap="4" mt="">
          <Button onClick={handleSave}>Save</Button>
          <Dialog.Root
            open={isFollowUpDialogOpen}
            onOpenChange={setIsFollowUpDialogOpen}
          >
            <Dialog.Trigger>
              <Button>Add Follow-up</Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <VisuallyHidden>
                <DialogTitle>Add Follow-up</DialogTitle>
              </VisuallyHidden>
              <Box p="4">
                <h3 className="text-2xl font-bold mb-4">Add Follow-up</h3>
                <label className="text-xl font-bold">Question</label>
                <TextField.Root
                  className="mb-4"
                  placeholder="Enter question..."
                  value={followUpQuestion.question}
                  onChange={(e) =>
                    setFollowUpQuestion({
                      ...followUpQuestion,
                      question: e.target.value,
                    })
                  }
                />
                <label className="text-xl font-bold">Answer</label>
                <TextArea
                  className="mb-4"
                  placeholder="Enter answer..."
                  style={{ height: "150px" }}
                  value={followUpQuestion.answer}
                  onChange={(e) =>
                    setFollowUpQuestion({
                      ...followUpQuestion,
                      answer: e.target.value,
                    })
                  }
                />
                <Button
                  className="mt-4 mr-4"
                  onClick={handleAddFollowUpQuestion}
                >
                  Save Follow-up
                </Button>
                <Button
                  className="mt-4"
                  onClick={() => setIsFollowUpDialogOpen(false)}
                >
                  Close
                </Button>
              </Box>
            </Dialog.Content>
          </Dialog.Root>

          <Dialog.Root
            open={isOptimizationDialogOpen}
            onOpenChange={setIsOptimizationDialogOpen}
          >
            <Dialog.Trigger>
              <Button>Optimization</Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <VisuallyHidden>
                <DialogTitle>Optimization</DialogTitle>
              </VisuallyHidden>
              <Box p="4">
                <h3 className="text-2xl font-bold mb-4">Optimization</h3>
                <TextArea
                  className="mb-4"
                  placeholder="Enter optimization details..."
                  style={{ height: "150px" }}
                  value={optimization.description}
                  onChange={(e) =>
                    setOptimization({
                      ...optimization,
                      description: e.target.value,
                    })
                  }
                />
                <Button className="mt-4 mr-4" onClick={handleAddOptimization}>
                  Save Optimization
                </Button>
                <Button
                  className="mt-4"
                  onClick={() => setIsOptimizationDialogOpen(false)}
                >
                  Close
                </Button>
              </Box>
            </Dialog.Content>
          </Dialog.Root>

          <Dialog.Root
            open={isFollowUpOptimizationDialogOpen}
            onOpenChange={setIsFollowUpOptimizationDialogOpen}
          >
            <Dialog.Trigger>
              <Button>Add Follow-up Optimization</Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <VisuallyHidden>
                <DialogTitle>Add Follow-up Optimization</DialogTitle>
              </VisuallyHidden>
              <Box p="4">
                <h3 className="text-2xl font-bold mb-4">
                  Follow-up Optimization
                </h3>
                <label className="text-xl font-bold">Question</label>
                <TextField.Root
                  className="mb-4"
                  placeholder="Enter follow-up question..."
                  value={followUpOptimization.question}
                  onChange={(e) =>
                    setFollowUpOptimization({
                      ...followUpOptimization,
                      question: e.target.value,
                    })
                  }
                />
                <label className="text-xl font-bold">Answer</label>
                <TextArea
                  placeholder="Enter follow-up answer..."
                  style={{ height: "150px" }}
                  value={followUpOptimization.answer}
                  onChange={(e) =>
                    setFollowUpOptimization({
                      ...followUpOptimization,
                      answer: e.target.value,
                    })
                  }
                />
                <Button
                  className="mt-4 mr-4"
                  onClick={handleAddFollowUpOptimization}
                >
                  Save Follow-up Optimization
                </Button>
                <Button
                  className="mt-4"
                  onClick={() => setIsFollowUpOptimizationDialogOpen(false)}
                >
                  Close
                </Button>
              </Box>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      </Flex>

      <Box
        style={{
          width: "50%",
          padding: "20px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h3 className="text-2xl font-bold mb-4">Add Keywords</h3>

        <Flex gap="3" style={{ width: "100%" }}>
          <Box style={{ width: "50%" }}>
            <label className="text-xl font-bold">Keyword</label>
            <TextField.Root
              className="mb-4"
              placeholder="Enter keyword..."
              value={keyword.keyword}
              onChange={(e) =>
                setKeyword({ ...keyword, keyword: e.target.value })
              }
            />
          </Box>

          <Box style={{ width: "50%" }}>
            <label className="text-xl font-bold">Select a Keyword</label>
            <div className="relative">
              <Select.Root
                value={selectedKeyword ? selectedKeyword.keyword : ""}
                onValueChange={(value) => {
                  const keyword = keywordsList.find(
                    (kw) => kw.keyword === value
                  );
                  if (keyword) {
                    setSelectedKeyword(keyword);
                    setKeyword({
                      keyword: keyword.keyword,
                      detail: keyword.detail,
                      context: keyword.context,
                    });
                    setFormData({
                      keyword: keyword.keyword,
                      description: keyword.detail,
                    });
                  }
                }}
              >
                <Select.Trigger className="border p-2 w-full">
                  {selectedKeyword
                    ? selectedKeyword.keyword
                    : "Choose a keyword"}
                </Select.Trigger>
                <Select.Content className="bg-white border mt-2 ">
                  <input
                    type="text"
                    placeholder="Search keywords..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border p-2 w-full mb-2"
                  />
                  <Select.Group>
                    {keywordsList
                      .filter((keyword) =>
                        keyword.keyword
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((keyword) => (
                        <Select.Item
                          key={keyword.keyword}
                          value={keyword.keyword}
                          className="bg-black text-white p-2"
                        >
                          <span>{keyword.keyword}</span>
                        </Select.Item>
                      ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </div>
          </Box>
        </Flex>

        <label className="text-xl font-bold">Detail</label>
        <TextArea
          className="mb-4"
          placeholder="Enter keyword detail..."
          style={{ height: "100px" }}
          value={keyword.detail}
          onChange={(e) => setKeyword({ ...keyword, detail: e.target.value })}
        />
        <label className="text-xl font-bold">Context</label>
        <TextArea
          className="mb-4"
          placeholder="Enter context..."
          style={{ height: "100px" }}
          value={keyword.context}
          onChange={(e) => setKeyword({ ...keyword, context: e.target.value })}
        />
        <Button className="mt-4" onClick={handleAddKeyword}>
          Add Keyword
        </Button>
      </Box>
    </Box>
  );
};

export default AddForm;
