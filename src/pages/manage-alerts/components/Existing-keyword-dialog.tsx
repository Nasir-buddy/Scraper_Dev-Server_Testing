// import { useState } from "react"
// import { AlertDialog, Button, Dialog, Flex, TextArea } from "@radix-ui/themes"
// import type { Keyword } from "../types"
// import existingKeywords from '../existing-keywords.json'
// import MarkdownPreview from "./Markdown-Preview"
// import Editor from "./Editor"

// interface KeywordDialogProps {
//     onSave: (keyword: Keyword) => void
// }

// export default function KeywordDialog({ onSave }: KeywordDialogProps) {
//     const [keyword, setKeyword] = useState("")
//     const [detail, setDetail] = useState("")
//     const [context, setContext] = useState("Generic Keyword")
//     const [search, setSearch] = useState("")
//     const [editingIndex, setEditingIndex] = useState<number | null>(null)
//     const [loading, setLoading] = useState(false)

//     const handleSave = async () => {
//         if (keyword && detail && context) {
//             setLoading(true)
//             const newKeyword: Keyword = { keyword, detail, context }
//             try {
//                 const response = await fetch('/api/manage-alerts/addExistingKeyword', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(newKeyword),
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     console.error('Failed to add keyword:', errorData.error);
//                     alert(`Error: ${errorData.error}`);
//                     return;
//                 }

//                 const responseData = await response.json();
//                 if (responseData.message.includes('processed successfully')) {
//                     console.log('Keyword processed successfully');
//                     setKeyword("");
//                     setDetail("");
//                     setContext("");
//                     setEditingIndex(null);
//                 } else {
//                     alert('Keyword already exists or was updated.');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 alert('An error occurred while processing the keyword.');
//             } finally {
//                 setLoading(false);
//             }
//         }
//     }

//     const handleEdit = (index: number) => {
//         const keywordToEdit = existingKeywords[index]
//         setKeyword(keywordToEdit.keyword)
//         setDetail(keywordToEdit.detail)
//         setContext(keywordToEdit.context)
//         setEditingIndex(index)
//     }
//     const handleDelete = async (index: number) => {
//         try {
//             const response = await fetch(`/api/manage-alerts/deleteExistingKeyword?index=${index}`, {
//                 method: 'DELETE',
//             });
//             if (response.ok) {
//                 existingKeywords.splice(index, 1);
//                 setEditingIndex(null);
//                 setKeyword("");
//                 setDetail("");
//                 setContext("");
//             } else {
//                 console.error('Failed to delete keyword');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     const filteredKeywords = existingKeywords.filter((k) =>
//         k.keyword.toLowerCase().includes(search.toLowerCase())
//     )

//     return (
//         <>
//             <div className="space-y-4">
//                 <div>
//                     <label className="block text-sm font-medium mb-2">Keyword</label>
//                     <TextArea
//                         placeholder="Enter keyword"
//                         value={keyword}
//                         onChange={(e) => setKeyword(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-2">Detail</label>
//                     {/* <TextArea
//                         placeholder="Enter detail"
//                         value={detail}
//                         onChange={(e) => setDetail(e.target.value)}
//                     /> */}
//                     <Editor value={detail} setValue={(value) => setDetail(value)} />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-2">Preview</label>
//                     {/* <TextArea
//                         placeholder="Enter detail"
//                         value={detail}
//                         onChange={(e) => setDetail(e.target.value)}
//                     /> */}
//                     <MarkdownPreview markdown={detail} keywords={[]} />
//                 </div>
//             </div>

//             <Button onClick={handleSave} className="mt-4 w-[200px] cursor-pointer" disabled={loading}>
//                 {loading ? 'Saving...' : 'Save'}
//             </Button>
//             <div className="mt-4">
//                 <label className="block text-sm font-medium mb-2">Search for existing keywords</label>
//                 <TextArea
//                     placeholder="Search existing keywords"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//             </div>
//             <ul className="mt-4">
//                 {filteredKeywords.map((k, index) => (
//                     <li key={index} className="border-b py-2">
//                         <strong>Keyword:</strong> {k.keyword} <br />
//                         <strong>Detail:</strong> <MarkdownPreview markdown={k.detail} keywords={[]} /> <br />
//                         {/* <strong>Context:</strong> {k.context} <br /> */}
//                         <Button onClick={() => handleEdit(index)} className="mt-2 bg-gray-100 mr-2 w-[100px] cursor-pointer" disabled={loading}>
//                             Edit
//                         </Button>
//                         {/* <Button onClick={() => handleDelete(index)} className="mt-2 bg-red-100 w-[100px]">
//                             Delete
//                         </Button> */}
//                         <AlertDialog.Root>
//                             <AlertDialog.Trigger>
//                                 <Button color="red" className="mt-2 cursor-pointer" disabled={loading}  >Delete Keyword</Button>
//                                 </AlertDialog.Trigger>
//                             <AlertDialog.Content maxWidth="450px">
//                                 <AlertDialog.Title>Delete Keyword</AlertDialog.Title>
//                                 <AlertDialog.Description size="2">
//                                     Are you sure you want to delete this keyword?
//                                 </AlertDialog.Description>

//                                 <Flex gap="3" mt="4" justify="end">
//                                     <AlertDialog.Cancel>
//                                         <Button variant="soft" color="gray">
//                                             Cancel
//                                         </Button>
//                                     </AlertDialog.Cancel>
//                                     <AlertDialog.Action>
//                                         <Button variant="solid" color="red" onClick={() => handleDelete(index)} disabled={loading}>
//                                             Delete
//                                         </Button>
//                                     </AlertDialog.Action>
//                                 </Flex>
//                             </AlertDialog.Content>
//                         </AlertDialog.Root>

//                     </li>
//                 ))}
//             </ul>
//         </>
//     )
// }