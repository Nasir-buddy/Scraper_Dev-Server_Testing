"use client"

import type { DocItem } from "@/pages/manage-docs/components/docs-manager"
import { Box, Card, Flex, Text, Button, AlertDialog, Heading, ScrollArea } from "@radix-ui/themes"
import { Pencil1Icon, TrashIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import MarkdownPreview from "@/pages/manage-alerts/components/NewMarkdownPreview"
interface DocLevelProps {
    items: DocItem[]
    selectedId: string | null
    onSelect: (_id: string) => void
    onEdit: (_id: string, level: number) => void
    onDelete: (_id: string) => void
    level: number
    parentTitle?: string
}

export function DocLevel({ items, selectedId, onSelect, onEdit, onDelete, level, parentTitle }: DocLevelProps) {
    console.log(`items are in doc level ${level}:`, items)
    return (
        <Box p="4">
            {parentTitle && (
                <Box mb="4">
                    <Text size="2" color="gray">
                        Parent: <Text weight="medium">{parentTitle}</Text>
                    </Text>
                </Box>
            )}

            {items.length === 0 ? (
                <Box style={{ textAlign: "center", padding: "32px 0" }}>
                    <Text color="gray">No items found. Click "Add Item" to create one.</Text>
                </Box>
            ) : (
                <ScrollArea className="scroll-area">
                    <Flex direction="column" gap="3">
                        {items.map((item) => (
                            <Card
                                key={item._id}
                                style={{
                                    cursor: "pointer",
                                    borderColor: selectedId === item._id ? "var(--accent-9)" : undefined,
                                }}
                            >
                                <Flex direction="column" gap="2">
                                    <Box>
                                        <Heading size="3">{item.title}</Heading>
                                        <Text size="1" color="gray">
                                            _id: {item._id}
                                        </Text>
                                    </Box>

                                    {/* <Text size="2">{item.content}</Text> */}
                                    <MarkdownPreview markdown={item.content} keywords={[]} />
                                    <Flex justify="between" align="center" mt="2">
                                        <Flex gap="2">
                                            <Button variant="soft" onClick={() => onEdit(item._id, level)}>
                                                <Pencil1Icon /> Edit
                                            </Button>

                                            <AlertDialog.Root>
                                                <AlertDialog.Trigger>
                                                    <Button variant="soft" color="red">
                                                        <TrashIcon /> Delete
                                                    </Button>
                                                </AlertDialog.Trigger>
                                                <AlertDialog.Content>
                                                    <AlertDialog.Title>Are you sure?</AlertDialog.Title>
                                                    <AlertDialog.Description>
                                                        This will delete "{item.title}" and all its child items. This action cannot be undone.
                                                    </AlertDialog.Description>

                                                    <Flex gap="3" mt="4" justify="end">
                                                        <AlertDialog.Cancel>
                                                            <Button variant="soft" color="gray">
                                                                Cancel
                                                            </Button>
                                                        </AlertDialog.Cancel>
                                                        <AlertDialog.Action>
                                                            <Button variant="solid" color="red" onClick={() => onDelete(item._id)}>
                                                                Delete
                                                            </Button>
                                                        </AlertDialog.Action>
                                                    </Flex>
                                                </AlertDialog.Content>
                                            </AlertDialog.Root>
                                        </Flex>

                                        {level <= 3 && <Button variant="ghost" onClick={() => onSelect(item._id)}>
                                            View Children <ChevronRightIcon />
                                        </Button>}
                                    </Flex>
                                </Flex>
                            </Card>
                        ))}
                    </Flex>
                </ScrollArea>
            )}
        </Box>
    )
}

