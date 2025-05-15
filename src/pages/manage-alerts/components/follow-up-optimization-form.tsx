"use client"
import { useState, useEffect } from "react"
import { Button } from "@radix-ui/themes"
// import { Input } from "@radix-ui/themes"
import { TextArea } from "@radix-ui/themes"
import type { FollowUpOptimization, Keyword } from "../../../schemas/alert-schemas/Alerts"
import Editor from "./Editor"
import MarkdownPreview from "./NewMarkdownPreview"
import NewKeywordForm from "./New-keyword-form"

interface FollowUpOptimizationFormProps {
  followUpOptimizations: FollowUpOptimization[]
  onChange: (optimizations: FollowUpOptimization[]) => void
  // keywords: Keyword[]
}

export default function FollowUpOptimizationForm({ followUpOptimizations, onChange }: FollowUpOptimizationFormProps) {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [editingOptimization, setEditingOptimization] = useState<FollowUpOptimization | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [showKeywordForm, setShowKeywordForm] = useState(false)

  const handleAddOrUpdate = () => {
    if (question && answer) {
      if (editingOptimization) {
        const updatedOptimizations = followUpOptimizations.map((opt) =>
          opt.id === editingOptimization.id ? { ...opt, question, answer, keywords } : opt
        )
        onChange(updatedOptimizations)
        setEditingOptimization(null)
      } else {
        const newOptimization: FollowUpOptimization = {
          id: `OPT${String(followUpOptimizations.length + 1).padStart(3, "0")}`,
          question,
          answer,
          keywords,
        }
        onChange([...followUpOptimizations, newOptimization])
      }
      setQuestion("")
      setAnswer("")
      setKeywords([])
    }
  }

  const handleEdit = (optimization: FollowUpOptimization) => {
    setQuestion(optimization.question)
    setAnswer(optimization.answer)
    setKeywords(optimization.keywords)
    setEditingOptimization(optimization)
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
          <TextArea placeholder="Enter your question" value={question} onChange={(e) => setQuestion(e.target.value)} />
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
      <MarkdownPreview markdown={answer} keywords={keywords || []} />
      <Button onClick={handleAddOrUpdate} className="w-full">
        {editingOptimization ? "Update Follow-up Optimization" : "Add Follow-up Optimization"}
      </Button>

      {followUpOptimizations.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-medium mb-4">Added Follow-up Optimizations:</h4>
          <div className="space-y-4">
            {followUpOptimizations.map((opt) => (
              <div key={opt.id} className="p-4 border rounded-lg bg-muted/50">
                <p className="font-medium mb-2">{opt.question}</p>
                <MarkdownPreview markdown={opt.answer} keywords={keywords || []} />
                <Button onClick={() => handleEdit(opt)} className="mt-2">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

