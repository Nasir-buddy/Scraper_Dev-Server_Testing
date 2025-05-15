"use client"

import { useState, useEffect } from "react"
import { Box, Card, Flex, Tabs, Text, Button, ScrollArea } from "@radix-ui/themes"
import { ChevronLeftIcon, PlusIcon } from "@radix-ui/react-icons"
import { DocLevel } from "@/pages/manage-docs/components/doc-level"
import { DocForm } from "@/pages/manage-docs/components/doc-form"
import { fetchDocsLevel1, fetchDocsLevel2, fetchDocsLevel3, fetchDocsLevel4, createDocLevel1, createDocLevel2, createDocLevel3, createDocLevel4, updateDocLevel1, updateDocLevel2, updateDocLevel3, updateDocLevel4, deleteDocLevel1, deleteDocLevel2, deleteDocLevel3, deleteDocLevel4 } from "@/services/docsService"

// Define types for our document structure
export type DocItem = {
    _id: string
    title: string
    content: string
    parentId?: string
}

export function DocsManager() {
    const [level1Items, setLevel1Items] = useState<DocItem[]>([])
    const [level2Items, setLevel2Items] = useState<DocItem[]>([])
    const [level3Items, setLevel3Items] = useState<DocItem[]>([])
    const [level4Items, setLevel4Items] = useState<DocItem[]>([])

    const [selectedLevel1, setSelectedLevel1] = useState<string | null>(null)
    const [selectedLevel2, setSelectedLevel2] = useState<string | null>(null)
    const [selectedLevel3, setSelectedLevel3] = useState<string | null>(null)
    const [selectedLevel4, setSelectedLevel4] = useState<string | null>(null)

    const [activeTab, setActiveTab] = useState("level1")
    const [isAdding, setIsAdding] = useState(false)
    const [isEditing, setIsEditing] = useState<{ id: string | null; level: number | null } | null>(null)
    const [toast, setToast] = useState<{ title: string; description: string; variant?: string } | null>(null)
    const [loadingLevel1, setLoadingLevel1] = useState(false)
    const [loadingLevel2, setLoadingLevel2] = useState(false)
    const [loadingLevel3, setLoadingLevel3] = useState(false)
    const [loadingLevel4, setLoadingLevel4] = useState(false)

    // Fetch level 1 items on component mount
    useEffect(() => {
        const fetchLevel1Items = async () => {
            setLoadingLevel1(true)
            try {
                const data = await fetchDocsLevel1()
                setLevel1Items(data)
            } catch (error) {
                showToast("Error", "Failed to fetch level 1 documents", "destructive")
            } finally {
                setLoadingLevel1(false)
            }
        }
        fetchLevel1Items()
    }, [])

    // Fetch level 2 items when a level 1 item is selected
    useEffect(() => {
        console.log("selectedLevel1 is:", selectedLevel1)
        if (selectedLevel1) {
            console.log("fetching level 2 items")
            const fetchLevel2Items = async () => {
                setLoadingLevel2(true)
                try {
                    const data = await fetchDocsLevel2(selectedLevel1)
                    setLevel2Items(data)
                } catch (error) {
                    showToast("Error", "Failed to fetch level 2 documents", "destructive")
                } finally {
                    setLoadingLevel2(false)
                }
            }
            fetchLevel2Items()
        }
    }, [selectedLevel1])

    // Fetch level 3 items when a level 2 item is selected
    useEffect(() => {
        console.log("selectedLevel2 is:", selectedLevel2)
        if (selectedLevel2) {
            console.log("fetching level 3 items")
            const fetchLevel3Items = async () => {
                setLoadingLevel3(true)
                try {
                    const data = await fetchDocsLevel3(selectedLevel2)
                    console.log("data level 3 is:", data)
                    setLevel3Items(data)
                } catch (error) {
                    showToast("Error", "Failed to fetch level 3 documents", "destructive")
                } finally {
                    setLoadingLevel3(false)
                }
            }
            fetchLevel3Items()
        }
    }, [selectedLevel2])

    // Fetch level 4 items when a level 3 item is selected
    useEffect(() => {
        if (selectedLevel3) {
            const fetchLevel4Items = async () => {
                setLoadingLevel4(true)
                try {
                    const data = await fetchDocsLevel4(selectedLevel3)
                    setLevel4Items(data)
                } catch (error) {
                    showToast("Error", "Failed to fetch level 4 documents", "destructive")
                } finally {
                    setLoadingLevel4(false)
                }
            }
            fetchLevel4Items()
        }
    }, [selectedLevel3])

    // Handle selection of items at different levels
    const handleSelectLevel1 = (id: string) => {
        setSelectedLevel1(id)
        setSelectedLevel2(null)
        setSelectedLevel3(null)
        setSelectedLevel4(null)
        setActiveTab("level2")
    }

    const handleSelectLevel2 = (id: string) => {
        setSelectedLevel2(id)
        setSelectedLevel3(null)
        setSelectedLevel4(null)
        setActiveTab("level3")
    }

    const handleSelectLevel3 = (id: string) => {
        setSelectedLevel3(id)
        setSelectedLevel4(null)
        setActiveTab("level4")
    }

    const handleSelectLevel4 = (id: string) => {
        setSelectedLevel4(id)
    }

    // Simple toast function
    const showToast = (title: string, description: string, variant?: string) => {
        setToast({ title, description, variant })
        setTimeout(() => setToast(null), 3000)
    }

    // CRUD operations for each level
    const addItem = async (level: number, item: Omit<DocItem, "id">) => {
        try {
            let newItem;
            console.log("Item for addItem is:", item)
            switch (level) {
                case 1:
                    newItem = await createDocLevel1(item)
                    setLevel1Items([...level1Items, newItem])
                    break
                case 2:
                    if (!selectedLevel1) {
                        showToast("Error", "Please select a parent item first", "destructive")
                        return
                    }
                    newItem = await createDocLevel2({ ...item, docsLevel1Id: selectedLevel1 })
                    setLevel2Items([...level2Items, newItem])
                    break
                case 3:
                    if (!selectedLevel2) {
                        showToast("Error", "Please select a parent item first", "destructive")
                        return
                    }
                    newItem = await createDocLevel3({ ...item, docsLevel2Id: selectedLevel2 })
                    setLevel3Items([...level3Items, newItem])
                    break
                case 4:
                    if (!selectedLevel3) {
                        showToast("Error", "Please select a parent item first", "destructive")
                        return
                    }
                    newItem = await createDocLevel4({ ...item, docsLevel3Id: selectedLevel3 })
                    setLevel4Items([...level4Items, newItem])
                    break
            }
            setIsAdding(false)
            showToast("Success", "Item added successfully")
        } catch (error) {
            showToast("Error", "Failed to add item", "destructive")
        }
    }

    const updateItem = async (level: number, updatedItem: { title: string, content: string, _id: string }) => {
        try {
            if (!updatedItem._id || !updatedItem.title || !updatedItem.content) {
                showToast("Error", "Item ID, title, and content are required", "destructive")
                return
            }
            console.log("updatedItem for updateItem is:", updatedItem)
            switch (level) {
                case 1:
                    await updateDocLevel1(updatedItem._id, { title: updatedItem.title, content: updatedItem.content })
                    setLevel1Items(level1Items.map((item) => (item._id === updatedItem._id ? updatedItem : item)))
                    break
                case 2:
                    await updateDocLevel2(updatedItem._id, updatedItem)
                    setLevel2Items(level2Items.map((item) => (item._id === updatedItem._id ? updatedItem : item)))
                    break
                case 3:
                    await updateDocLevel3(updatedItem._id, updatedItem)
                    setLevel3Items(level3Items.map((item) => (item._id === updatedItem._id ? updatedItem : item)))
                    break
                case 4:
                    await updateDocLevel4(updatedItem._id, updatedItem)
                    setLevel4Items(level4Items.map((item) => (item._id === updatedItem._id ? updatedItem : item)))
                    break
            }
            setIsEditing(null)
            showToast("Success", "Item updated successfully")
        } catch (error) {
            showToast("Error", "Failed to update item", "destructive")
        }
    }

    const deleteItem = async (level: number, id: string) => {
        try {
            switch (level) {
                case 1:
                    await deleteDocLevel1(id)
                    setLevel1Items(level1Items.filter((item) => item._id !== id))
                    // Also delete all children
                    const level2Ids = level2Items.filter((item) => item.parentId === id).map((item) => item._id)
                    setLevel2Items(level2Items.filter((item) => item.parentId !== id))

                    // Delete level 3 items that are children of deleted level 2 items
                    const level3Ids = level3Items.filter((item) => level2Ids.includes(item.parentId || "")).map((item) => item._id)
                    setLevel3Items(level3Items.filter((item) => !level2Ids.includes(item.parentId || "")))

                    // Delete level 4 items that are children of deleted level 3 items
                    setLevel4Items(level4Items.filter((item) => !level3Ids.includes(item.parentId || "")))

                    if (selectedLevel1 === id) {
                        setSelectedLevel1(null)
                        setSelectedLevel2(null)
                        setSelectedLevel3(null)
                        setSelectedLevel4(null)
                    }
                    break
                case 2:
                    await deleteDocLevel2(id)
                    setLevel2Items(level2Items.filter((item) => item._id !== id))
                    // Delete children
                    const childLevel3Ids = level3Items.filter((item) => item.parentId === id).map((item) => item._id)
                    setLevel3Items(level3Items.filter((item) => item.parentId !== id))
                    setLevel4Items(level4Items.filter((item) => !childLevel3Ids.includes(item.parentId || "")))

                    if (selectedLevel2 === id) {
                        setSelectedLevel2(null)
                        setSelectedLevel3(null)
                        setSelectedLevel4(null)
                    }
                    break
                case 3:
                    await deleteDocLevel3(id)
                    setLevel3Items(level3Items.filter((item) => item._id !== id))
                    setLevel4Items(level4Items.filter((item) => item.parentId !== id))

                    if (selectedLevel3 === id) {
                        setSelectedLevel3(null)
                        setSelectedLevel4(null)
                    }
                    break
                case 4:
                    await deleteDocLevel4(id)
                    setLevel4Items(level4Items.filter((item) => item._id !== id))

                    if (selectedLevel4 === id) {
                        setSelectedLevel4(null)
                    }
                    break
            }
            showToast("Success", "Item deleted successfully")
        } catch (error) {
            showToast("Error", "Failed to delete item", "destructive")
        }
    }

    // Get filtered items based on parent selection
    // const getFilteredLevel2Items = () => {
    //     return level2Items.filter((item) => item.docsLevel1Id === selectedLevel1)
    // }

    // const getFilteredLevel3Items = () => {
    //     return level3Items.filter((item) => item.parentId === selectedLevel2)
    // }

    // const getFilteredLevel4Items = () => {
    //     return level4Items.filter((item) => item.parentId === selectedLevel3)
    // }

    // Get the current item being edited
    const getItemToEdit = () => {
        if (!isEditing) return null
        console.log("isEditing is:", isEditing)
        const level = isEditing.level
        const id = isEditing.id
        console.log("level for isEditing is:", level)
        console.log("id for isEditing is:", id)
        switch (level) {
            case 1:
                return level1Items.find((item) => item._id === id) || null
            case 2:
                return level2Items.find((item) => item._id === id) || null
            case 3:
                return level3Items.find((item) => item._id === id) || null
            case 4:
                return level4Items.find((item) => item._id === id) || null
            default:
                return null
        }
    }

    return (
        <Card>

            {toast && (
                <Box
                    position="fixed"
                    top="0"
                    right="0"
                    style={{
                        zIndex: 100,
                        margin: "20px",
                        padding: "10px 20px",
                        background: toast.variant === "destructive" ? "var(--red-9)" : "var(--green-9)",
                        color: "white",
                        borderRadius: "var(--radius-3)",
                    }}
                >
                    <Text weight="bold">{toast.title}</Text>
                    <Text>{toast.description}</Text>
                </Box>
            )}

            {isAdding && (
                <Box p="4" style={{ borderBottom: "1px solid var(--gray-6)" }}>
                    <Text size="5" weight="bold" mb="4">
                        Add New{" "}
                        {activeTab === "level1"
                            ? "Level 1"
                            : activeTab === "level2"
                                ? "Level 2"
                                : activeTab === "level3"
                                    ? "Level 3"
                                    : "Level 4"}{" "}
                        Item
                    </Text>
                    <DocForm
                        onSubmit={(data) => {
                            const level = activeTab === "level1" ? 1 : activeTab === "level2" ? 2 : activeTab === "level3" ? 3 : 4
                            addItem(level, data)
                        }}
                        onCancel={() => setIsAdding(false)}
                    />
                </Box>
            )}

            {isEditing && (
                <Box p="4" style={{ borderBottom: "1px solid var(--gray-6)" }}>
                    <Text size="5" weight="bold" mb="4">
                        Edit Item
                    </Text>
                    <DocForm
                        initialData={getItemToEdit()}
                        onSubmit={(data) => {
                            const level = isEditing.level
                            updateItem(level || 0, { ...data, _id: isEditing.id || "" })
                        }}
                        onCancel={() => setIsEditing(null)}
                    />
                </Box>
            )}

            {!isAdding && !isEditing && (
                <Tabs.Root value={activeTab}>
                    <Flex justify="between" align="center" p="4" style={{ borderBottom: "1px solid var(--gray-6)" }}>
                        <Tabs.List>
                            <Tabs.Trigger value="level1" disabled>Level 1</Tabs.Trigger>
                            <Tabs.Trigger value="level2" disabled>Level 2</Tabs.Trigger>
                            <Tabs.Trigger value="level3" disabled>Level 3</Tabs.Trigger>
                            <Tabs.Trigger value="level4" disabled>Level 4</Tabs.Trigger>
                        </Tabs.List>

                        <Button onClick={() => setIsAdding(true)} size="2">
                            <PlusIcon /> Add Item
                        </Button>
                    </Flex>

                    {/* <Button onClick={() => {
                            if (activeTab === "level2") {
                                setActiveTab("level1");
                                setSelectedLevel1(null);
                            } else if (activeTab === "level3") {
                                setActiveTab("level2");
                                setSelectedLevel2(null);
                            } else if (activeTab === "level4") {
                                setActiveTab("level3");
                                setSelectedLevel3(null);
                            }
                        }} size="2" style={{ margin: "10px" }}>
                            Back
                        </Button> */}
                    {activeTab !== "level1" && <Button variant="ghost" className="m-4 cursor-pointer" onClick={() => {
                        if (activeTab === "level2") {
                            setActiveTab("level1");
                            setSelectedLevel1(null);
                        } else if (activeTab === "level3") {
                            setActiveTab("level2");
                            setSelectedLevel2(null);
                        } else if (activeTab === "level4") {
                            setActiveTab("level3");
                            setSelectedLevel3(null);
                        }
                    }}>
                        <ChevronLeftIcon /> Back to parent
                    </Button>}
                    <Tabs.Content value="level1">
                        {loadingLevel1 ? (
                            <Text>Loading Level 1 Items...</Text>
                        ) : (
                            <DocLevel
                                items={level1Items}
                                selectedId={selectedLevel1}
                                onSelect={handleSelectLevel1}
                                onEdit={(id) => setIsEditing({ id: id, level: 1 })}
                                onDelete={(id) => deleteItem(1, id)}
                                level={1}
                            />
                        )}
                    </Tabs.Content>

                    <Tabs.Content value="level2">
                        {loadingLevel2 ? (
                            <Text>Loading Level 2 Items...</Text>
                        ) : (
                            <DocLevel
                                items={level2Items}
                                selectedId={selectedLevel2}
                                onSelect={handleSelectLevel2}
                                onEdit={(id) => setIsEditing({ id: id, level: 2 })}
                                onDelete={(id) => deleteItem(2, id)}
                                level={2}
                                parentTitle={level1Items.find((item) => item._id === selectedLevel1)?.title}
                            />
                        )}
                    </Tabs.Content>

                    <Tabs.Content value="level3">
                        {loadingLevel3 ? (
                            <Text>Loading Level 3 Items...</Text>
                        ) : (
                            <DocLevel
                                items={level3Items}
                                selectedId={selectedLevel3}
                                onSelect={handleSelectLevel3}
                                onEdit={(id) => setIsEditing({ id: id, level: 3 })}
                                onDelete={(id) => deleteItem(3, id)}
                                level={3}
                                parentTitle={level2Items.find((item) => item._id === selectedLevel2)?.title}
                            />
                        )}
                    </Tabs.Content>

                    <Tabs.Content value="level4">
                        {loadingLevel4 ? (
                            <Text>Loading Level 4 Items...</Text>
                        ) : (
                            <DocLevel
                                items={level4Items}
                                selectedId={selectedLevel4}
                                onSelect={handleSelectLevel4}
                                onEdit={(id) => setIsEditing({ id: id, level: 4 })}
                                onDelete={(id) => deleteItem(4, id)}
                                level={4}
                                parentTitle={level3Items.find((item) => item._id === selectedLevel3)?.title}
                            />
                        )}
                    </Tabs.Content>
                </Tabs.Root>
            )}
        </Card>
    )
}

