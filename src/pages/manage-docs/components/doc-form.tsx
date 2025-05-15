"use client"

import type React from "react"

import { useState } from "react"
import { Box, Button, Flex, Text, TextField, TextArea } from "@radix-ui/themes"
import type { DocItem } from "@/pages/manage-docs/components/docs-manager"
import Editor from "@/pages/manage-alerts/components/Editor"
import MarkdownPreview from "@/pages/manage-alerts/components/NewMarkdownPreview"

interface DocFormProps {
  initialData?: DocItem | null
  onSubmit: (data: { title: string; content: string }) => void
  onCancel: () => void
}

export function DocForm({ initialData, onSubmit, onCancel }: DocFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    if (!content.trim()) {
      setError("Content is required")
      return
    }

    onSubmit({ title, content })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="4">
        <Box display="block" mb="1">
          <Text as="label" size="2">
            Title
          </Text>
        </Box>
        <TextField.Root value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />

        <Box mb="1" display="block">
          <Text as="label" size="2">
            Content
          </Text>
        </Box>
        {/* <TextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter content" rows={5} /> */}
        <Editor value={content} setValue={setContent} />

        <Box mb="1" display="block">
          <Text as="label" size="2">
            Preview
          </Text>
        </Box>
        {/* <TextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter content" rows={5} /> */}
        <MarkdownPreview markdown={content} keywords={[]} />

        {error && (
          <Text color="red" size="2">
            {error}
          </Text>
        )}

        <Flex justify="end" gap="2">
          <Button type="button" variant="soft" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Update" : "Add"} Item</Button>
        </Flex>
      </Flex>
    </form>
  )
}

