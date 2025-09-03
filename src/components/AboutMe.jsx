import { Link } from "react-router-dom"
import man from "../images/man.png"

export default function AboutMe(){
    const section = `flex flex-col gap-4 flex-1 shadow-all rounded-lg 
                     p-4 lg:gap-12  `
    const p = `text-neutral-600 lg:text-lg`
    const img = `w-32 h-32 rounded-lg object-cover flex-shrink-0 
                 shadow-lg shadow-neutral-700/30 lg:mt-6 lg:mb-6
                 sm:w-40 sm:h-40 lg:w-58 lg:h-58`
    const link = `inline-flex items-center px-4 py-2 rounded-lg ml-1 lg:ml-5
                  green-cyan text-white font-medium 
                  shadow-lg transition-colors transition-transform transition-shadow
                  duration-300 ease-in-out 
                  hover:bg-gradient-to-r hover:from-cyan-500 hover:to-green-400
                  hover:shadow-xl hover:scale-105 active:scale-95`
    const div = `flex flex-col gap-3 sm:gap-5 lg:gap-8`
    const span = `font-bold text-neutral-800`
    const extraDiv = `hidden lg:flex lg:flex-col lg:gap-8 `
    return(
        <section className={section}>
            <img
               src={man}
               alt="Portrait"
               className={img}
            />
            <div className={div}>
                <p className={p}>
                  <span className={`${span} mr-1`}>Hello!</span> I'm Giorgio, a web developer passionate about
                  creating beautiful and functional websites.
                </p>
                <p className={p}>
                  I have experience with <span className={span}>React</span>, <span className={span}>Tailwind</span>,
                  <span className={span}> Firebase</span> and various
                  web technologies. I love turning ideas into reality through code.
                </p>
                 <div className={extraDiv}>
                  <p className={p}>
                     I’ve recently completed <span className={span}>project1</span>,
                     <span className={span}>project2</span>, and <span className={span}>project3</span>,
                     each helping me grow as a developer and explore new creative possibilities.
                  </p>
                  <p className={p}>
                     Currently, I’m diving into <span className={span}>Node.js</span>,
                     <span className={span}>Next.js</span>, and <span className={span}>TypeScript</span>,
                     expanding my toolkit to build modern, scalable, and efficient applications.
                  </p>
                </div>
                <p className={`${p} mt-16 lg:font-bold lg:text-xl`}>Check out <Link className={link} to="/resume">my resume here</Link></p>
            </div>
        </section>
    )
}




/*

const link = `font-bold underline text-neutral-800 inline-block
                  transition-transform duration-300 ease-in-out hover:scale-105`


*/