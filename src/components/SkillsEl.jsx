import { skillsData } from "../skillsData"
import LinearBar from "./layout/LinearBar"


export default function SkillsEl(){
    const container = `p-4 shadow-all rounded-lg
                       flex-1`
    const title = `text-2xl font-bold mb-2 text-neutral-600`
    const section1 = `flex flex-col gap-4`
    const skillContainer = `border-b border-neutral-300 p-4`
    const skilTitle = `text-lg font-semibold mb-2`
    const skilDesciption = `text-neutral-600 mt-2`

    const skillsArray = skillsData.slice(0, 5)

    const skillsEl = skillsArray.map(s => (
        <section key={s.id} className={skillContainer}>
            <h3 className={skilTitle}>{s.name}</h3>
            <LinearBar gradient="green-cyan" value={s.progression} />
            <p className={skilDesciption}>{s.description}</p>
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