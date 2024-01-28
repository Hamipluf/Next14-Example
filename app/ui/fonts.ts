// De forma nativa podes importar todos las fuentes de GoogleFonts 
import { Montserrat, Lusitana } from 'next/font/google'

// Para exportarlo se devuevle en una variable 
export const monsterrat = Montserrat({ subsets: ['latin'] })

export const lusitana = Lusitana({
    subsets: ['latin'],
    weight: ['400', '700']
})

