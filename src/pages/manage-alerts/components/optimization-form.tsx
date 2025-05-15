"use client"

import { useState, useEffect } from "react"
import { Button, Flex } from "@radix-ui/themes"
import { TextArea } from "@radix-ui/themes"
import { FollowUpQuestion, Optimization, FollowUpOptimization, Keyword } from "../../../schemas/alert-schemas/Alerts"
import Editor from "./Editor"
import MarkdownPreview from "./NewMarkdownPreview"
import NewKeywordForm from "./New-keyword-form"

interface OptimizationFormProps {
  optimizations: Optimization[]
  onChange: (optimizations: Optimization[]) => void
  // keywords: Keyword[]
}

export default function OptimizationForm({ optimizations, onChange }: OptimizationFormProps) {
  const [description, setDescription] = useState("")
  const [editingOptimization, setEditingOptimization] = useState<Optimization | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [showKeywordForm, setShowKeywordForm] = useState(false)

  const handleAddOrUpdate = () => {
    console.log("Current Keywords:", keywords)
    if (description) {
      if (editingOptimization) {
        const updatedOptimizations = optimizations.map((opt) =>
          opt.id === editingOptimization.id ? { ...opt, description, keywords } : opt
        )
        onChange(updatedOptimizations)
        console.log("Updated Optimizations:", updatedOptimizations)
        setEditingOptimization(null)
      } else {
        console.log("Adding new optimization")
        console.log("Optimizations keywords:", keywords)
        const newOptimization: Optimization = {
          id: `OPT${String(optimizations.length + 1).padStart(3, "0")}`,
          description,
          keywords,
        }
        const newOptimizations = [...optimizations, newOptimization]
        onChange(newOptimizations)
        console.log("New Optimizations:", newOptimizations)
      }
      setDescription("")
      setKeywords([])
    }
  }

  const handleEdit = (optimization: Optimization) => {
    console.log("Editing Optimization:", optimization)
    setDescription(optimization.description)
    setKeywords(optimization.keywords)
    setEditingOptimization(optimization)
  }

  const handleRemove = (optimizationId: string) => {
    const updatedOptimizations = optimizations.filter(opt => opt.id !== optimizationId)
    onChange(updatedOptimizations)
    console.log("Removed Optimization:", optimizationId)
  }

  useEffect(() => {
    if (description) {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [description])

  return (
    <div className="space-y-6">
      <div>
        <Flex justify="between" p="2">
          <label className="block font-medium mb-2">
            {editingOptimization ? `${editingOptimization.id}` : "Description"}
          </label>
          <Button variant="outline" onClick={() => setShowKeywordForm(!showKeywordForm)}>Add Keyword</Button>
        </Flex>
        {showKeywordForm && (
          <NewKeywordForm
            keywords={keywords}
            onChange={(newKeywords) => {
              console.log("New Keywords from Form:", newKeywords)
              setKeywords(newKeywords)
            }}
            setOpenDialogs={() => setShowKeywordForm(false)}
          />
        )}
        <Editor value={description} setValue={(value) => setDescription(value)} />
      </div>
      <MarkdownPreview markdown={description} keywords={keywords} />
      <Button onClick={handleAddOrUpdate} className="w-full">
        {editingOptimization ? "Update Optimization" : "Add Optimization"}
      </Button>

      {optimizations.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-medium mb-4">Added Optimizations:</h4>
          <div className="space-y-4">
            {optimizations.map((opt) => (
              <div key={opt.id} className="p-4 border rounded-lg bg-muted/50">
                <MarkdownPreview markdown={opt.description} keywords={opt.keywords} />
                <Flex justify="between" className="mt-2">
                  <Button onClick={() => handleEdit(opt)} variant="outline" className="cursor-pointer">Edit</Button>
                  <Button onClick={() => handleRemove(opt.id)} variant="solid" color="red" className="cursor-pointer">Remove</Button>
                </Flex>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

