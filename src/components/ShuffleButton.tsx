import tw from 'tailwind-styled-components'

export const ShuffleButton = tw.button`
disabled:opacity-50
relative 
inline-flex 
items-center 
justify-center 
font-heading
font-bold 
p-0.5 
mt-3 
mb-2 
mr-2 
overflow-hidden 
text-sm  
text-gray-900 
rounded-lg group 
bg-gradient-to-br 
from-cyan-500
to-blue-500
group-hover:from-cyan-500
group-hover:to-blue-500
hover:text-white
dark:text-white
focus:ring-4
focus:outline-none
focus:ring-cyan-200
dark:focus:ring-cyan-800`
