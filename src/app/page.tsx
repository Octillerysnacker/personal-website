import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
        <div className={styles.top}>
        <h1>Robert Rosas</h1>
        </div>
        <div className={styles.middle}>
          <div className={styles.sidebar}>
          <Image src="/headshot.jpg" height={256} width={256} alt="Headshot of Robert Rosas." className={styles.headshot}/>
          </div>
          <div className={styles.mainmain}>
            <p>Website coming soon!</p>
            <p>Will be updated with summary + experiences + projects!</p>
            <p>In the mean time, check out my <a href="https://www.linkedin.com/in/robert-rosas-3a62a0256">LinkedIn</a> and <a href="https://github.com/octillerysnacker">GitHub</a>!</p>              
          </div>
        </div>


  
    </main>
  )
}
