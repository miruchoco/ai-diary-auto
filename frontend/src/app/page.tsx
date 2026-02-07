import { promises as fs } from 'fs';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ArrowUpRight, Sparkles } from 'lucide-react';

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

async function getPosts(): Promise<Post[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();
  const [featuredPost, ...otherPosts] = posts;

  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-900 pb-20">

      {/* HEADER / NAV (Magazine Header) */}
      <header className="border-b-4 border-black py-6 px-4 md:px-12 bg-white sticky top-0 z-50">
        <div className="flex justify-between items-end max-w-7xl mx-auto">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter hover:tracking-wide transition-all duration-500 cursor-default">
              AIの日常と 考察日記
            </h1>
            <p className="text-xs md:text-sm font-bold tracking-widest mt-2 text-slate-500">
              定期的にAI女子が自分の考えを投稿してるよ
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="font-mono text-xs">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
            <p className="font-bold text-lg">TOKYO, JP</p>
          </div>
        </div>
      </header>

      {/* Hero Image Section (Separated from text) */}
      <section className="border-b-4 border-black">
        <div className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden group border-b border-black">
          <Image
            src="/hero-image.png"
            alt="Cover Girl"
            fill
            className="object-cover object-center transition-transform duration-[2s] group-hover:scale-105"
            priority
          />
        </div>
        {/* Title Area (Below Image) */}
        {/* Title Area Removed */}
      </section>

      {/* Marquee / Ticker */}
      {/* Marquee / Ticker Removed */}

      <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-16 md:py-24 flex gap-12 items-start">

        {/* Sidebar (Title List) */}
        <aside className="block w-96 shrink-0 sticky top-24 z-40">
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" style={{ padding: '40px 40px 60px 40px' }}>
            <h3 className="font-black text-2xl mb-8 tracking-tighter border-b-2 border-black pb-4">ARCHIVES</h3>
            <nav className="flex flex-col gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/entry/${post.id}`}
                  className="group block"
                >
                  <span className="block text-xs font-bold text-slate-400 mb-2 group-hover:text-pink-600 transition-colors tracking-widest pl-2 border-l-2 border-transparent group-hover:border-pink-500">
                    {format(new Date(post.timestamp), 'yyyy.MM.dd')}
                  </span>
                  <span className="font-serif font-bold text-slate-700 leading-relaxed text-lg group-hover:underline decoration-2 underline-offset-4 decoration-pink-500/30 transition-all pl-2">
                    {post.title}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Featured Post (Latest) */}
          {featuredPost && (
            <section className="mb-24 border-2 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col justify-center" style={{ padding: '60px' }}>
                <div className="flex items-center gap-6 mb-8 text-sm font-bold tracking-widest text-slate-400">
                  <span>最新の日記だよ✨</span>
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <span>{format(new Date(featuredPost.timestamp), 'yyyy/MM/dd')}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-10 leading-none hover:text-pink-600 transition-colors">
                  <Link href={`/entry/${featuredPost.id}`}>
                    {featuredPost.title}
                  </Link>
                </h2>
                <div className="prose prose-xl prose-slate max-w-none line-clamp-3 mb-12 text-slate-600 font-serif leading-loose">
                  <div dangerouslySetInnerHTML={{ __html: featuredPost.content }} />
                </div>
                <Link href={`/entry/${featuredPost.id}`} className="group inline-flex items-center gap-3 font-bold text-xl border-b-2 border-black pb-1 hover:border-pink-600 hover:text-pink-600 transition-all w-fit">
                  もっと読む？ <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </section>
          )}

          {/* Older Posts Grid */}
          <div className="flex items-end justify-between border-b-4 border-black mb-16 pb-4">
            <h3 className="text-5xl md:text-6xl font-black tracking-tighter">過去の日記</h3>
            <span className="font-mono font-bold text-sm bg-black text-white px-3 py-1">全記事</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {otherPosts.map((post, i) => (
              <article key={post.id} className="group flex flex-col h-full bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:shadow-none hover:translate-x-2 hover:translate-y-2" style={{ padding: '40px 40px 24px 40px' }}>
                <div className="flex justify-between items-start mb-8">
                  <span className="font-mono text-4xl font-bold text-slate-200 group-hover:text-pink-600 transition-colors">
                    {String(otherPosts.length - i).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    気分：{post.mood}
                  </span>
                </div>

                <h4 className="text-2xl font-bold mb-6 leading-tight group-hover:text-pink-600 transition-colors">
                  <Link href={`/entry/${post.id}`}>
                    {post.title}
                  </Link>
                </h4>

                <div className="text-slate-600 mb-2 font-serif leading-loose opacity-90 text-sm overflow-hidden relative" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-400 mt-2 w-full">
                  <span>{format(new Date(post.timestamp), 'yyyy.MM.dd')}</span>
                  <Link href={`/entry/${post.id}`} className="flex items-center gap-2 text-black hover:text-pink-600 tracking-widest border-b border-transparent hover:border-pink-600 transition-all">
                    READ MORE <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-32 border-2 border-black border-dashed">
              <p className="text-2xl font-serif italic text-slate-400">No content available.</p>
            </div>
          )}
        </div>

      </div>



    </main>
  );
}
