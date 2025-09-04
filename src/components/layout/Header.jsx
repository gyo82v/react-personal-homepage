import { NavLink } from "react-router-dom"

export default function Header(){
    const header = `bg-neutral-700 text-neutral-300 px-4 py-6 shadow-lg shadow-neutral-700/30
                    flex justify-between items-center`
    const h1 = `text-2xl font-bold lg:text-3xl`
    const nav = `flex gap-3 font-semibold lg:gap-14 lg:mr-10 lg:text-lg`
    const link = `transition-transform duration-300 ease-in-out hover:scale-120`
    const linkActive = `underline`
    return(
        <header className={header}>
            <h1 className={h1}>Giorgio Valle</h1>
            <nav className={nav}>
                <NavLink to="/" className={(({isActive}) => isActive ? linkActive : link)}>Home</NavLink>
                <NavLink to="projects" className={({isActive}) => isActive ? linkActive : link}>Projects</NavLink>
                <NavLink to="skills" className={({isActive}) => isActive ? linkActive : link}>Skills</NavLink>
                <NavLink to="resume" className={({isActive}) => isActive ? linkActive : link}>Resume</NavLink>
            </nav>
        </header>
    )
}