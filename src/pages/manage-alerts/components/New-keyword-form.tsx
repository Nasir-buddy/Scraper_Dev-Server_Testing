import React, { useState, useEffect } from 'react'
import { Keyword } from '../types'
import { Button, DropdownMenu, Flex, Spinner, Strong, TextArea, Tooltip } from '@radix-ui/themes'
import { fetchDocsLevel1, fetchDocsLevel2, fetchDocsLevel3, fetchDocsLevel4 } from '@/services/docsService'

const NewKeywordForm = ({ keywords, onChange, setOpenDialogs }: { keywords: Keyword[], onChange: (keywords: Keyword[]) => void, setOpenDialogs: (prev: any) => any }) => {
    const [keyword, setKeyword] = useState<Keyword | null>(null)
    const [matching_text, setMatching_text] = useState<string>('')
    const [level1Docs, setLevel1Docs] = useState([])
    const [level2Docs, setLevel2Docs] = useState([])
    const [level3Docs, setLevel3Docs] = useState([])
    const [level4Docs, setLevel4Docs] = useState([])

    const [selectedLevel1, setSelectedLevel1] = useState<string | null>(null)
    const [selectedLevel2, setSelectedLevel2] = useState<string | null>(null)
    const [selectedLevel3, setSelectedLevel3] = useState<string | null>(null)
    const [selectedLevel4, setSelectedLevel4] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // onChange(keywords)
        if (keyword) {
            console.log("New Keyword Form keyword", keyword)
            onChange([...keywords, keyword])
        }
    }, [keyword])

    useEffect(() => {
        const fetchLevel1Docs = async () => {
            setLoading(true)
            const data = await fetchDocsLevel1()
            setLevel1Docs(data)
            setLoading(false)
        }
        fetchLevel1Docs()
    }, [])

    useEffect(() => {
        if (selectedLevel1) {
            const fetchLevel2Docs = async () => {
                setLoading(true)
                const data = await fetchDocsLevel2(selectedLevel1)
                setLevel2Docs(data)
                setLoading(false)
            }
            fetchLevel2Docs()
        }
    }, [selectedLevel1])

    useEffect(() => {
        if (selectedLevel2) {
            const fetchLevel3Docs = async () => {
                setLoading(true)
                const data = await fetchDocsLevel3(selectedLevel2)
                setLevel3Docs(data)
                setLoading(false)
            }
            fetchLevel3Docs()
        }
    }, [selectedLevel2])

    useEffect(() => {
        if (selectedLevel3) {
            const fetchLevel4Docs = async () => {
                setLoading(true)
                const data = await fetchDocsLevel4(selectedLevel3)
                setLevel4Docs(data)
                setLoading(false)
            }
            fetchLevel4Docs()
        }
    }, [selectedLevel3])

    const handleAddKeyword = () => {
        const selectedDocId = selectedLevel4 || selectedLevel3 || selectedLevel2 || selectedLevel1 || ''
        const selectedLevel = selectedLevel4 ? 4 : selectedLevel3 ? 3 : selectedLevel2 ? 2 : selectedLevel1 ? 1 : 0

        const newKeyword = { doc_id: selectedDocId, level: selectedLevel, matching_text }
        const updatedKeywords = [...keywords, newKeyword]
        onChange(updatedKeywords)
        setOpenDialogs((prev: any) => ({ ...prev, keyword: false }))
    }

    const handleClearSelection = () => {
        setSelectedLevel1(null)
        setSelectedLevel2(null)
        setSelectedLevel3(null)
        setSelectedLevel4(null)
    }

    return (
        <div className="p-4 shadow-md rounded-md">
            {loading && <Spinner />}
            <div className="mb-4">
                <Flex gap="2" direction="column">
                    <Strong>Matching Text</Strong>
                    <TextArea value={matching_text} onChange={(e) => setMatching_text(e.target.value)} />
                </Flex>
            </div>

            <div className="mb-4">
                {/* <label className="block text-sm font-medium text-gray-700">Level 1 Document</label>
                <Tooltip content="Select a Level 1 document to proceed">
                    <select className="mt-1 block w-full border border-gray-300 rounded-md" onChange={(e) => setSelectedLevel1(e.target.value)} value={selectedLevel1 || ''}>
                        <option value="">Select Level 1</option>
                        {level1Docs.map((doc: any) => <option key={doc._id} value={doc._id}>{doc.title}</option>)}
                    </select>
                </Tooltip> */}
                <Flex gap="2" direction="column">
                    <Strong>Level 1 Document</Strong>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="soft" className="w-full md:w-1/2">
                                {`${selectedLevel1 ? level1Docs.find((doc: any) => doc._id === selectedLevel1)?.title : 'Select Level 1 Document'}`}
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            {level1Docs.map((doc: any) => (
                                <DropdownMenu.Item key={doc._id} onClick={() => setSelectedLevel1(doc._id)}>
                                    {doc.title}
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            </div>
            {selectedLevel1 && level2Docs.length > 0 && (
                <div className="mb-4">
                    {/* <label className="block text-sm font-medium text-gray-700">Level 2 Document</label>
                    <Tooltip content="Select a Level 2 document to proceed">
                        <select className="mt-1 block w-full border border-gray-300 rounded-md" onChange={(e) => setSelectedLevel2(e.target.value)} value={selectedLevel2 || ''}>
                            <option value="">Select Level 2</option>
                            {level2Docs.map((doc: any) => <option key={doc._id} value={doc._id}>{doc.title}</option>)}
                        </select>
                    </Tooltip> */}
                    <Flex gap="2" direction="column">
                        <Strong>Level 2 Document</Strong>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Button variant="soft" className="w-full md:w-1/2">
                                    {`${selectedLevel2 ? level2Docs.find((doc: any) => doc._id === selectedLevel2)?.title : 'Select Level 2 Document'}`}
                                    <DropdownMenu.TriggerIcon />
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                {level2Docs.map((doc: any) => (
                                    <DropdownMenu.Item key={doc._id} onClick={() => setSelectedLevel2(doc._id)}>
                                        {doc.title}
                                    </DropdownMenu.Item>
                                ))}
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Flex>
                </div>
            )}
            {selectedLevel2 && level3Docs.length > 0 && (
                // <div className="mb-4">
                //     <label className="block text-sm font-medium text-gray-700">Level 3 Document</label>
                //     <Tooltip content="Select a Level 3 document to proceed">
                //         <select className="mt-1 block w-full border border-gray-300 rounded-md" onChange={(e) => setSelectedLevel3(e.target.value)} value={selectedLevel3 || ''}>
                //             <option value="">Select Level 3</option>
                //             {level3Docs.map((doc: any) => <option key={doc._id} value={doc._id}>{doc.title}</option>)}
                //         </select>
                //     </Tooltip>
                // </div>
                <Flex gap="2" direction="column">
                    <Strong>Level 3 Document</Strong>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="soft" className="w-full md:w-1/2">
                                {`${selectedLevel3 ? level3Docs.find((doc: any) => doc._id === selectedLevel3)?.title : 'Select Level 3 Document'}`}
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            {level3Docs.map((doc: any) => (
                                <DropdownMenu.Item key={doc._id} onClick={() => setSelectedLevel3(doc._id)}>
                                    {doc.title}
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            )}
            {selectedLevel3 && level4Docs.length > 0 && (
                // <div className="mb-4">
                //     <label className="block text-sm font-medium text-gray-700">Level 4 Document</label>
                //     <Tooltip content="Select a Level 4 document to proceed">
                //         <select className="mt-1 block w-full border border-gray-300 rounded-md" onChange={(e) => setSelectedLevel4(e.target.value)} value={selectedLevel4 || ''}>
                //             <option value="">Select Level 4</option>
                //             {level4Docs.map((doc: any) => <option key={doc._id} value={doc._id}>{doc.title}</option>)}
                //         </select>
                //     </Tooltip>
                // </div>
                <Flex gap="2" direction="column">
                    <Strong>Level 4 Document</Strong>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="soft" className="w-full md:w-1/2">
                                {`${selectedLevel4 ? level4Docs.find((doc: any) => doc._id === selectedLevel4)?.title : 'Select Level 4 Document'}`}
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            {level4Docs.map((doc: any) => (
                                <DropdownMenu.Item key={doc._id} onClick={() => setSelectedLevel4(doc._id)}>
                                    {doc.title}
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            )}

            <div className="flex justify-between mt-4">
                <Button onClick={handleAddKeyword}>Add Keyword</Button>
                <Button onClick={handleClearSelection} variant="outline">Clear Selection</Button>
            </div>
        </div>
    )
}

export default NewKeywordForm