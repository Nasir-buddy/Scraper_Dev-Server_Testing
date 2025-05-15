import { Flex, ScrollArea } from "@radix-ui/themes"
import MarkdownPreview from "./NewMarkdownPreview"
// import { AlertType } from "../../../schemas/alert-schemas/Alerts"
import { AlertState } from "../index"
export default function Preview({ alert }: { alert: AlertState }) {
  return (
    <div className="p-4 border rounded-lg">
      <Flex direction="row" justify="between" mb="2">
        <h2 className="text-2xl font-bold mb-4">Preview</h2>
        <p>ID: {alert.id}</p>
      </Flex>
      <ScrollArea className="max-h-screen">

        <div className="">
          {/* <div>
            <h3 className="font-semibold">ID:</h3>
            <p>{alert.id}</p>
          </div> */}

          {alert.title && <div>
            <h3 className="font-semibold">Title:</h3>
            <p>{alert.title}</p>
          </div>}

          {alert.description && <div>
            <h3 className="font-semibold">Content:</h3>
            {/* <p className="whitespace-pre-wrap">{alert.description}</p> */}
            <MarkdownPreview markdown={alert.description} keywords={alert.keywords} />
          </div>}

          {alert.followUpQuestions.length > 0 && (
            <div>
              <h3 className="font-semibold">Follow-up Questions:</h3>
              <ul className="list-disc pl-5">
                {alert.followUpQuestions.map((q: any) => (
                  <li key={q.id}>
                    <p className="font-medium">{q.question}</p>
                    {/* <p className="text-gray-600">{q.answer}</p> */}
                    <MarkdownPreview markdown={q.answer} keywords={q.keywords} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {alert.optimizations.length > 0 && (
            <div>
              <h3 className="font-semibold">Optimizations:</h3>
              <ul className="list-disc pl-5">
                {alert.optimizations.map((opt: any) => (
                  <li key={opt.id}>
                    <MarkdownPreview markdown={opt.description} keywords={opt.keywords} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {alert.followUpOptimizations.length > 0 && (
            <div>
              <h3 className="font-semibold">Follow-up Optimizations:</h3>
              <ul className="list-disc pl-5">
                {alert.followUpOptimizations.map((opt: any) => (
                  <li key={opt.id}>
                    <p className="font-medium">{opt.question}</p>
                    {/* <p className="text-gray-600">{opt.answer}</p> */}
                    <MarkdownPreview markdown={opt.description} keywords={opt.keywords} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* {alert.keywords.length > 0 && (
            <div>
              <h3 className="font-semibold">Keywords:</h3>
              <ul className="list-disc pl-5">
                {alert.keywords.map((k: any) => (
                  <li key={k.keyword}>
                    <p className="font-medium">{k.keyword}</p>
                    <MarkdownPreview markdown={k.detail} keywords={alert.keywords} />
                  </li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      </ScrollArea>
    </div>

  )
}

