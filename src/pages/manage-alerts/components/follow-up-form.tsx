"use client"

import { useState, useEffect } from "react"
import { Button } from "@radix-ui/themes"
// import { Input } from "@radix-ui/themes"
import { TextArea } from "@radix-ui/themes"
import type { FollowUpQuestion } from "../../../schemas/alert-schemas/Alerts"
import Editor from "./Editor"
import Markdownpreview from "./NewMarkdownPreview"
import type { Keyword } from "../../../schemas/alert-schemas/Alerts"
import NewKeywordForm from "./New-keyword-form"

interface FollowUpFormProps {
  questions: FollowUpQuestion[]
  onChange: (questions: FollowUpQuestion[]) => void
  // keywords: Keyword[]
}

export default function FollowUpForm({ questions, onChange }: FollowUpFormProps) {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [editingQuestion, setEditingQuestion] = useState<FollowUpQuestion | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [showKeywordForm, setShowKeywordForm] = useState(false)

  const handleAddOrUpdate = () => {
    if (question && answer) {
      if (editingQuestion) {
        const updatedQuestions = questions.map((q) =>
          q.id === editingQuestion.id ? { ...q, question, answer, keywords } : q
        )
        onChange(updatedQuestions)
        setEditingQuestion(null)
      } else {
        const newQuestion: FollowUpQuestion = {
          id: `FU${String(questions.length + 1).padStart(3, "0")}`,
          question,
          answer,
          keywords,
        }
        onChange([...questions, newQuestion])
      }
      setQuestion("")
      setAnswer("")
      setKeywords([])
    }
  }

  const handleEdit = (question: FollowUpQuestion) => {
    setQuestion(question.question)
    setAnswer(question.answer)
    setKeywords(question.keywords)
    setEditingQuestion(question)
  }

  const handleRemove = (questionId: string) => {
    const updatedQuestions = questions.filter(q => q.id !== questionId)
    onChange(updatedQuestions)
  }

  useEffect(() => {
    if (question && answer) {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [question, answer])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setShowKeywordForm(!showKeywordForm)}>Add Keyword</Button>
        </div>
        {showKeywordForm && (
          <NewKeywordForm
            keywords={keywords}
            onChange={(newKeywords) => setKeywords(newKeywords)}
            setOpenDialogs={() => setShowKeywordForm(false)}
          />
        )}
        <div>
          <label className="block text-sm font-medium mb-2">Question</label>
          <TextArea
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Answer</label>
          {/* <TextArea
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="min-h-[200px]"
          /> */}
          <Editor value={answer} setValue={(value) => setAnswer(value)} />
        </div>
        
      </div>
      <Markdownpreview markdown={answer} keywords={keywords} />
      <Button onClick={handleAddOrUpdate} className="w-full">
        {editingQuestion ? "Update Question" : "Add Question"}
      </Button>

      {questions.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-medium mb-4">Added Questions:</h4>
          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q.id} className="p-4 border rounded-lg bg-muted/50">
                <p className="font-medium mb-2">{q.question}</p>
                <Markdownpreview markdown={q.answer} keywords={q.keywords} />
                <div className="flex justify-between mt-2">
                  <Button onClick={() => handleEdit(q)} variant="outline" className="cursor-pointer">Edit</Button>
                  <Button onClick={() => handleRemove(q.id)} variant="solid" color="red" className="cursor-pointer">Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

