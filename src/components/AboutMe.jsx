import { Link } from "react-router-dom"
import man from "../images/man.png"

export default function AboutMe(){
    const section = `flex border border-bleck-600 my-20`
    const h2 = ``
    const p = ``
    const link = ``
    return(
        <section className={section}>
            <img
               src={man}
               alt="Portrait"
               className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
            />
            <div>
                <h2 className={h2}>About me</h2>
                <p className={p}>
                  Hello! I'm Giorgio, a web developer passionate about
                  creating beautiful and functional websites.
                </p>
                <p className={p}>
                  I have experience with HTML, CSS, JavaScript, and various
                  web technologies. I love turning ideas into reality through code.
                </p>
                <p className={p}>Check out <Link className={link} to="/resume">my resume here</Link>.</p>
            </div>
        </section>
    )
}