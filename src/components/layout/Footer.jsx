import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer(){
    const footer = `bg-neutral-700 text-neutral-300 px-4 py-6 shadow-top-neutral`
    const div = `flex flex-col mx-auto max-w-6xl md:flex-row items-center justify-between px-4`
    const div1 = `flex text-2xl gap-6`
    const p = `text-sm mb-4 md:mb-0 text-neutral-400 tracking-wide font-light `
    const transition = `transition-colors transition-transform transition-shadow
                        hover:scale-110 active:scale-95 hover:shadow-xl
                        duration-300 ease-in-out shadow-lg rounded-full`
    
    
    return(
        <footer className={footer}>
            <div className={div}>
                <p className={p}>@{new Date().getFullYear()}GyoV. All right reserved.</p>
                <div className={div1}>
                    <a
                      target="_blank"
                      className={`${transition} hover:text-pink-500 shadow-pink-300/30`}
                      href="https://instagram.com/yourusername"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      target="_blank"
                      className={`${transition} hover:text-sky-400 shadow-sky-300/30`}
                      href="https://twitter.com/yourusername"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      target="_blank"
                      className={`${transition} hover:text-blue-500 shadow-blue-300/30`}
                      href="https://linkedin.com/in/yourusername"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      target="_blank"
                      className={`${transition} hover:text-gray-50 shadow-gray-300/30`}
                      href="https://github.com/gyo82v"
                      rel="noopener noreferrer" 
                    >
                      <FaGithub />
                    </a>
                </div>
            </div>
        </footer>
    )
}