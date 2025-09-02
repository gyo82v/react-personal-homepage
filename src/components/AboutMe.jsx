import { Link } from "react-router-dom"
import man from "../images/man.png"

export default function AboutMe(){
    const section = `flex flex-col gap-4 flex-1 md:flex-row shadow-all rounded-lg 
                     p-4 `
    const p = `text-neutral-600`
    const link = `inline-flex items-center px-4 py-2 rounded-lg ml-1
                  green-cyan text-white font-medium 
                  shadow-lg transition-colors transition-transform transition-shadow
                  duration-300 ease-in-out 
                  hover:bg-gradient-to-r hover:from-cyan-500 hover:to-green-400
                  hover:shadow-xl hover:scale-105 active:scale-95`
    const div = `flex flex-col gap-3`
    const span = `font-bold text-neutral-800`
    return(
        <section className={section}>
            <img
               src={man}
               alt="Portrait"
               className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
            />
            <div className={div}>
                <p className={p}>
                  <span className="font-bold mr-1 text-neutral-800 ">Hello!</span> I'm Giorgio, a web developer passionate about
                  creating beautiful and functional websites.
                </p>
                <p className={p}>
                  I have experience with <span className={span}>React</span>, <span className={span}>Tailwind</span>,
                  <span className={span}> Firebase</span> and various
                  web technologies. I love turning ideas into reality through code.
                </p>
                <p className={p}>Check out <Link className={link} to="/resume">my resume here</Link>.</p>
            </div>
        </section>
    )
}




/*

const link = `font-bold underline text-neutral-800 inline-block
                  transition-transform duration-300 ease-in-out hover:scale-105`


*/