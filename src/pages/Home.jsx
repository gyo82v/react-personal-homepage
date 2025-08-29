import AboutMe from "../components/AboutMe"
import Slider from "../components/Slider"

export default function Home(){
    const container = `flex flex-col items-center w-full`
    return(
        <section className={container}>
            <Slider />
            <AboutMe />
            <section><h1>skills here</h1></section>
        </section>
    )
}