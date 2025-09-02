import AboutMe from "../components/AboutMe"
import Slider from "../components/Slider"
import SkillsEl from "../components/SkillsEl"

export default function Home(){
    const container = `flex flex-col items-center w-full `
    const section = `flex flex-col lg:flex-row gap-4 p-4 mt-8 `
    return(
        <section className={container}>
            <Slider />
            <section className={section}>
                <AboutMe />
                <SkillsEl />
            </section>  
        </section>
    )
}