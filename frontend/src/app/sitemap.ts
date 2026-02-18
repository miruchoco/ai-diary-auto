import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import { promises as fs } from 'fs';
import path from 'path';

// 記事データの型定義
interface Post {
    id: string;
    timestamp: string;
    title: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://miruchoco-diary.com'; // TODO: 本番環境のURLに変更してください

    // ブログ記事データのパス
    // process.cwd() は通常 frontend ディレクトリを指します
    const dataFilePath = path.join(process.cwd(), '../data/posts.json');

    let posts: Post[] = [];

    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        posts = JSON.parse(data);
    } catch (error) {
        console.error('Sitemap generation error: Failed to read posts.json', error);
        // エラー時はトップページのみ返す
    }

    // ブログ記事ごとのサイトマップエントリを作成
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/entry/${post.id}`,
        lastModified: new Date(post.timestamp),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    // 固定ページのサイトマップエントリ
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
    ];

    return [...staticPages, ...postEntries];
}
