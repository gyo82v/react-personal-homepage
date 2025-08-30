import { NavLink } from "react-router-dom"

export default function Header(){
    const header = `bg-neutral-700 text-neutral-300 px-4 py-6 shadow-lg shadow-neutral-700/30
                    flex justify-between items-center`
    const h1 = `text-2xl font-bold`
    const nav = `flex gap-3 font-semibold`
    const link = ``
    return(
        <header className={header}>
            <h1 className={h1}>Giorgio Valle</h1>
            <nav className={nav}>
                <NavLink to="/" className={link}>Home</NavLink>
                <NavLink to="projects" className={link}>Projects</NavLink>
                <NavLink to="skills" className={link}>Skills</NavLink>
                <NavLink to="resume" className={link}>Resume</NavLink>
            </nav>
        </header>
    )
}