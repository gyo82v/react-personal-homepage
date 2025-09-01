import { skillsData } from "../skillsData"
import LinearBar from "./layout/LinearBar"


export default function SkillsEl(){
    const container = ``
    const title = `text-2xl font-bold`
    const section1 = ``
    const skillContainer = ``
    const skilTitle = ``
    const skilDesciption = ``

    const skillsEl = skillsData.map(s => (
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