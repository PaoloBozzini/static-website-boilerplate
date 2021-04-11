export default {
   htmlPageNames: ['about', 'contact', 'news/news'] as string[] | [], // string[] or empty [] if no pages
   entries: {
      main: './src/main.ts',
   } as { main: string, [key: string]: string }
}
