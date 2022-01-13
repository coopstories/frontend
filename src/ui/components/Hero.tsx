import React from 'react'
import { ReactComponent as StoriesIcon } from '../../assets/icons/stories_2.svg'

const Hero: React.FC = () => {
  return (
    <section className="py-6 px-5 sm:px-10 bg-secondary">
      <div className="max-w-4xl mx-auto flex justify-around">
        <StoriesIcon
          className="
            h-40 sm:h-52 md:h-64 
          fill-primary self-center
          "
        />

        <h2
          className="
            text-gray-50 self-center
            text-4xl sm:text-5xl md:text-6xl
            leading-snug sm:leading-normal md:leading-normal
          "
        >
          Write stories <br />
          with <span className="bg-primary text-gray-100">friends.</span>
        </h2>
      </div>
    </section>
  )
}

export default Hero
