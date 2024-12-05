import {Button} from "@/components/ui/button"
import Link from "next/link"
import {MountainIcon} from 'lucide-react'
import {DraggableNoteDemo} from "@/components/draggable-note-demo"
import {UMLTreeDemo} from "@/components/uml-tree-demo"
import {Textarea} from "@/components/ui/textarea";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center border-b">
                <Link className="flex items-center justify-center" href="#">
                    <MountainIcon className="h-6 w-6 mr-2"/>
                    <span className="font-bold">UML Notes</span>
                </Link>

            </header>
            <main className="flex-1 justify-center">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="w-full px-4 md:px-6 flex justify-center items-center">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    UML Notes: Visualize Your Ideas
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Create, organize, and visualize your notes with our powerful draggable notes and
                                    text-based UML structure.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link href="/registration">
                                <Button>Get Started</Button>
                                </Link>
                                <Button variant="outline">Learn More</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="w-full px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                            Key Features
                        </h2>
                        <div className="grid gap-6 items-center md:grid-cols-2">
                            <div className="flex flex-col space-y-4">
                                <h3 className="text-2xl font-bold">Draggable Notes</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Create and organize your thoughts with our intuitive draggable note interface.
                                    Easily rearrange and group your ideas.
                                </p>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <h3 className="text-2xl font-bold">Text-based UML</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Visualize complex structures and relationships using our simple yet powerful
                                    text-based UML system.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
                    <div className=" px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                            Demo
                        </h2>
                        <div className="grid gap-6 items-center md:grid-cols-2">
                            <DraggableNoteDemo/>
                            <UMLTreeDemo/>
                        </div>
                    </div>
                </section>
                <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className=" px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Have a Feedback?
                                </h2>
                                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                    We would love to hear your feedback! Feel free to reach out to us at
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <form className="flex flex-col gap-4">
                                    <Textarea
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="message"
                                    />

                                    <Button type="submit">Send</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 UML Notes. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}

