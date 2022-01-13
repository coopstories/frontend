import React from 'react'
import { ReactComponent as StoriesIcon } from '../../assets/icons/stories_2.svg'

const Hero: React.FC = () => {
  return (
    <section className="py-6 px-10 bg-secondary">
      <div className="max-w-4xl mx-auto flex justify-around">
        <StoriesIcon className="h-64 fill-primary shrink-0 self-center" />

        <h2 className="text-7xl text-gray-50 leading-snug self-center">
          Write stories <br />
          with <span className="bg-primary text-gray-100">friends.</span>
        </h2>
      </div>
    </section>
  )
}

export default Hero
