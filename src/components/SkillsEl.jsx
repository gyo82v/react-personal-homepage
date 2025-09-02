import { skillsData } from "../skillsData"
import LinearBar from "./layout/LinearBar"


export default function SkillsEl(){
    const container = `p-4 shadow-all rounded-lg
                       flex-1`
    const title = `text-2xl font-bold mb-2 text-neutral-600`
    const section1 = `flex flex-col gap-4`
    const skillContainer = ``
    const skilTitle = ``
    const skilDesciption = ``

    const skillsArray = skillsData.slice(0, 5)

    const skillsEl = skillsArray.map(s => (
        <section key={s.id}>
            <h3>{s.name}</h3>
            <LinearBar gradient="green-cyan" value={s.progression} />
            <p>{s.description}</p>
        </section>
    ))

    return(
        <section className={container}>
            <h2 className={title}>Skills</h2>
            <section className={section1}>
                {skillsEl}
            </section>            
        </section>
    )
}