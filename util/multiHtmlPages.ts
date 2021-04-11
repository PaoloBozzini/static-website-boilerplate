import HtmlWebpackPlugin from 'html-webpack-plugin'

export function setMultiHtmlPages(pageNames: string[], includeMain = true): HtmlWebpackPlugin[] {
   return pageNames.map(
      (name): HtmlWebpackPlugin => {
         return new HtmlWebpackPlugin({
            template: `./src/html/${name}.html`,
            filename: `html/${name}.html`,
            chunks: [`${name.split('/').slice(-1)[0]}`, includeMain? "main" : ""],
         })
      }
   )
}
