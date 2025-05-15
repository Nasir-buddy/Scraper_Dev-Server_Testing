// "use client"
// import { useState, useRef, useEffect } from "react"
// import { Button, DropdownMenu, Flex, Select, Text, TextField } from "@radix-ui/themes"
// // import { Input } from "@/components/ui/input"
// import { TextArea } from "@radix-ui/themes"
// import type { Keyword } from "../types"
// import Editor from "./Editor"
// import MarkdownPreview from "./Markdown-Preview"
// import existingKeywords from '../existing-keywords.json'

// interface KeywordFormProps {
//   keywords: Keyword[]
//   onChange: (keywords: Keyword[]) => void
//   context: string
// }

// export default function KeywordForm({ keywords, onChange, context }: KeywordFormProps) {
//   const [keyword, setKeyword] = useState("")
//   const [detail, setDetail] = useState("")
//   const [editingKeyword, setEditingKeyword] = useState<Keyword | null>(null)
//   const [isEditing, setIsEditing] = useState(false)
//   const containerRef = useRef<HTMLDivElement>(null)

//   const handleAdd = () => {
//     if (keyword && detail && context) {
//       const keywordExists = keywords.some((k) => k.keyword === keyword)
//       if (keywordExists) {
//         alert(`The keyword "${keyword}" already exists with details.`)
//         return
//       }
//       if (editingKeyword) {
//         const updatedKeywords = keywords.map((k) =>
//           k.keyword === editingKeyword.keyword ? { ...k, keyword, detail, context } : k
//         )
//         onChange(updatedKeywords)
//         setEditingKeyword(null)
//       } else {
//         const newKeyword: Keyword = {
//           keyword,
//           detail,
//           context,
//         }
//         onChange([...keywords, newKeyword])
//       }
//       setKeyword("")
//       setDetail("")
//     }
//   }

//   const handleSelect = (keyword: string) => {
//     setKeyword(keyword)
//     setDetail(existingKeywords.find((k) => k.keyword === keyword)?.detail || "")
//   }

//   const handleEdit = (keyword: Keyword) => {
//     setKeyword(keyword.keyword)
//     setDetail(keyword.detail)
//     setEditingKeyword(keyword)
//     if (containerRef.current) {
//       containerRef.current.scrollTop = 0
//     }
//   }
//   useEffect(() => {
//     // setIsEditing(true)
//     if (keyword && detail) {
//       setIsEditing(true)
//     } else {
//       setIsEditing(false)
//     }
//   }, [keyword, detail])
//   return (
//     <div className="space-y-6" ref={containerRef}>
//       <div className="space-y-4">

//         <Flex gap="3" mb="4">
//           <div className="w-1/2">
//             <label className="block text-sm font-medium mb-2">Keyword</label>
//             <TextArea className="h-[30px]" placeholder="Enter keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
//             {/* <label>
//               <Text as="div" size="2" mb="1" weight="bold">
//                 Keyword
//               </Text>
//               <TextField.Root
//                 defaultValue={keyword}
//                 onChange={(e) => setKeyword(e.target.value)}
//                 placeholder="Enter your keyword"
//               />
//             </label> */}
//           </div>
//           <div className="w-1/2">
//             <label className="block text-sm font-medium mb-2">Choose From Existing Keywords</label>
//             <DropdownMenu.Root>
//               <DropdownMenu.Trigger>
//                 <Button variant="soft" className="w-full">
//                   Keywords
//                   <DropdownMenu.TriggerIcon />
//                 </Button>
//               </DropdownMenu.Trigger>
//               <DropdownMenu.Content>
//                 {existingKeywords.map((k) => (
//                   <DropdownMenu.Item key={k.keyword} onClick={() => handleSelect(k.keyword)}>
//                     {k.keyword}
//                   </DropdownMenu.Item>
//                 ))}
//               </DropdownMenu.Content>
//             </DropdownMenu.Root>


//           </div>
//         </Flex>

//         <div>
//           <label className="block text-sm font-medium mb-2">Detail</label>
//           {/* <TextArea
//             placeholder="Enter detail"
//             value={detail}
//             onChange={(e) => setDetail(e.target.value)}
//             className="min-h-[150px]"
//           /> */}
//           <Editor value={detail} setValue={(value) => setDetail(value)} />
//         </div>
//         {/* <div>
//           <label className="block text-sm font-medium mb-2">Context</label>
//           <TextArea
//             placeholder="Enter context"
//             value={context}
//             onChange={(e) => setContext(e.target.value)}
//             className="min-h-[150px]"
//           />
//         </div> */}
//       </div>
//       <MarkdownPreview markdown={detail} keywords={[]} />
//       <Button onClick={handleAdd} disabled={!isEditing} className="w-full">
//         Add Keyword
//       </Button>

//       {keywords.length > 0 && (
//         <div className="mt-4">
//           <h4 className="text-lg font-medium mb-4">Added Keywords:</h4>
//           <div className="space-y-4">
//             {keywords.map((k) => (
//               <div key={k.keyword} className="p-4 border rounded-lg bg-muted/50">
//                 <p className="font-medium mb-2">{k.keyword}</p>
//                 <MarkdownPreview markdown={k.detail} keywords={[]} />
//                 <Button onClick={() => handleEdit(k)} className="mt-2">
//                   Edit
//                 </Button>
//                 {/* <p className="text-sm text-muted-foreground mb-2">{k.detail}</p> */}
//                 {/* <p className="text-sm text-muted-foreground whitespace-pre-wrap">{k.context}</p> */}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

