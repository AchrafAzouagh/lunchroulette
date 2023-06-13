// Declare png module
declare module '*.png'

// Declare svg module
declare module '*.svg' {
  import React = require('React')

  export const ReactComponent: React.FC<
    React.SVGProps<SVGSVGElement> & { alt?: string; title?: string }
  >

  const src: string

  export default src
}
