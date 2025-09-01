import AboutMe from "../components/AboutMe"
import Slider from "../components/Slider"
import SkillsEl from "../components/SkillsEl"

export default function Home(){
    const container = `flex flex-col items-center w-full`
    const section = `flex flex-col lg:flex-row p-4`
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