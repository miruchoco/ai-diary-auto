import { promises as fs } from 'fs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ArrowLeft, Feather } from 'lucide-react';

const DATA_FILE_PATH = 'c:/miruchoco/aidiary/data/posts.json';

interface Post {
    id: string;
    timestamp: string;
    title: string;
    content: string;
    mood: string;
    news_source: string;
    news_title: string;
    thought_process: string;
}

async function getPost(id: string): Promise<Post | undefined> {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const posts: Post[] = JSON.parse(data);
        return posts.find((p) => p.id === id);
    } catch (error) {
        return undefined;
    }
}

export default async function EntryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-paper text-ink-800 font-serif selection:bg-ink-900 selection:text-white pb-0">
            {/* Minimalist Navigation (Reverted) */}
            <nav className="fixed top-0 w-full z-50 bg-paper/90 backdrop-blur-sm transition-all duration-300">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link
                        href="/"
                        className="group flex items-center gap-3 text-ink-500 hover:text-ink-900 transition-colors duration-500"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-500 ease-out" />
                        <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase">Back</span>
                    </Link>
                    <div className="font-display text-2xl italic text-ink-400">
                        AI Diary
                    </div>
                </div>
            </nav>

            <article className="pt-40">
                {/* Editorial Hero (Reverted) */}
                <header className="max-w-[720px] mx-auto px-6 mb-24 text-center">
                    <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both">
                        <div className="flex flex-col items-center gap-4 mb-8">
                            <div className="font-display text-sm tracking-[0.2em] uppercase text-ink-500 border-b border-ink-900/10 pb-2 mb-2 flex items-center gap-4">
                                <span>{format(new Date(post.timestamp), 'yyyy', { locale: ja })}</span>
                                <span className="w-1 h-1 bg-ink-300 rounded-full"></span>
                                <span>{format(new Date(post.timestamp), 'MMMM', { locale: ja })}</span>
                                <span className="w-1 h-1 bg-ink-300 rounded-full"></span>
                                <span className="font-bold text-ink-800">{format(new Date(post.timestamp), 'dd', { locale: ja })}</span>
                            </div>
                            <div className="text-xs font-sans tracking-widest text-ink-400 flex items-center gap-2">
                                <span className="opacity-70">気分：</span>
                                <span className="font-medium text-ink-600">{post.mood}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-ink-900 leading-[1.6] tracking-wide mt-8">
                            {post.title}
                        </h1>

                        {post.news_title && (
                            <a
                                href={post.news_source || '#'}
                                target="_blank"
                                className="mt-8 text-xs font-sans text-ink-400 hover:text-accent-red transition-colors border-b border-transparent hover:border-accent-red/30 pb-0.5 tracking-wide"
                            >
                                Related: {post.news_title}
                            </a>
                        )}
                    </div>
                </header>

                {/* Main Content - The "Paper" (Reverted) */}
                <div className="max-w-[680px] mx-auto px-6 mb-32">
                    <div className="prose prose-lg prose-headings:font-serif prose-p:font-serif prose-p:text-justify prose-p:leading-[2.2] max-w-none">
                        <div
                            className="first-letter:float-left first-letter:text-6xl first-letter:font-display first-letter:mr-4 first-letter:mt-[-0.2em] first-letter:text-ink-900"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* End mark */}
                    <div className="flex justify-center mt-20 text-ink-900/20">
                        <span className="text-xl">❦</span>
                    </div>
                </div>

                {/* Internal Monologue - Pop & Center Style (KEPT) */}
                <section className="bg-white/50 py-24 mt-20 font-sans relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-300 via-pink-400 to-yellow-300 opacity-50"></div>

                    <div className="max-w-[720px] mx-auto px-6 relative z-10">
                        <div className="bg-[#fff9c4] text-[#4a4a4a] p-10 md:p-14 rounded-[2rem] shadow-[8px_8px_0px_0px_#ff6b6b] border-4 border-[#4a4a4a] transform rotate-1 hover:rotate-0 transition-transform duration-300 relative group">

                            {/* Sticker */}
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#ff6b6b] text-white py-1.5 px-10 -rotate-2 shadow-sm font-bold tracking-widest text-xs z-20">
                                CONFIDENTIAL??
                            </div>

                            <div className="text-center relative z-10">
                                <div className="inline-flex items-center justify-center gap-2 bg-white px-6 py-2 rounded-full border-2 border-[#4a4a4a] mb-8 shadow-[4px_4px_0px_0px_#4a4a4a]">
                                    <span className="text-2xl animate-pulse">🤫</span>
                                    <h3 className="text-sm font-bold tracking-widest text-[#4a4a4a]">
                                        AIのホンネ（編集後記）
                                    </h3>
                                </div>

                                <div className="font-sans font-medium text-base leading-loose tracking-wide opacity-90 whitespace-pre-wrap text-left mx-auto max-w-lg">
                                    {post.thought_process}
                                </div>
                                <div className="mt-8 text-3xl animate-bounce">
                                    💭
                                </div>
                            </div>

                            {/* Dot Pattern Background */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(#4a4a4a 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}>
                            </div>
                        </div>
                    </div>

                    <footer className="max-w-4xl mx-auto mt-24 text-center">
                        <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 text-ink-500">
                            AI Diary Project
                        </div>
                        <div className="font-display italic text-2xl opacity-20 text-ink-900 mt-2">
                            Fin.
                        </div>
                    </footer>
                </section>
            </article>
        </main>
    );
}
