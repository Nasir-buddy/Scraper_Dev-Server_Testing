import { DocsManager } from "@/pages/manage-docs/components/docs-manager"
import { Button, Flex, ScrollArea } from "@radix-ui/themes"

export default function Home() {
  return (
    <main className="container h-full w-full mx-auto py-6 max-h-screen">
      <Flex gap="2" justify="between">
        <h1 className="text-3xl font-bold mb-6">Documentation Manager</h1>
        <Flex gap="4">
          <Button asChild variant="ghost">
            <a href="/platform">Home</a>
          </Button>
          <Button asChild variant="ghost">
            <a target="_blank" href="https://docs.google.com/document/d/1zr88U13dH2Nt8O1dhT_g472vxG1yC7rO/edit?usp=sharing&ouid=101830418088148608966&rtpof=true&sd=true">View Docs</a>
          </Button>
        <Button asChild variant="ghost">
          <a href="/manage-alerts">Manage Alerts</a>
          </Button>
        </Flex>
      </Flex>
      <ScrollArea className="h-[calc(100vh-6rem)]">
        <DocsManager />
      </ScrollArea>
    </main>
  )
}

