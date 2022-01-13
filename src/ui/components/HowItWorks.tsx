import React from 'react'
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg'
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg'
import { ReactComponent as DocumentIcon } from '../../assets/icons/document.svg'

const STEPS = [
  {
    IconComponent: AddIcon,
    heading: 'Create a Story',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vel molestiae fugit magni modi molestias excepturi aliquam rerum quibusdam eos officiis nesciunt natus quaerat, dolores voluptatibus ducimus deserunt ut voluptatem.',
  },

  {
    IconComponent: ShareIcon,
    heading: 'Let your friends continue the story',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vel molestiae fugit magni modi molestias excepturi aliquam rerum quibusdam eos officiis nesciunt natus quaerat, dolores voluptatibus ducimus deserunt ut voluptatem.',
  },

  {
    IconComponent: DocumentIcon,
    heading: 'Read the story together',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vel molestiae fugit magni modi molestias excepturi aliquam rerum quibusdam eos officiis nesciunt natus quaerat, dolores voluptatibus ducimus deserunt ut voluptatem.',
  },
]

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 px-5 sm:px-10 space-y-6 bg-gray-100">
      <h3 className="text-grey-800 text-5xl text-center">How it works</h3>

      {STEPS.map(({ IconComponent, heading, description }) => (
        <article className="bg-primary text-gray-50 py-4 px-6 rounded-xl shadow-md max-w-2xl mx-auto">
          <h4 className="font-serif text-2xl py-3 space-x-3 flex items-center">
            <IconComponent className="h-8 w-8 inline-block" />
            <span>{heading}</span>
          </h4>

          <p className="font-serif text-lg text-gray-200">{description}</p>
        </article>
      ))}
    </section>
  )
}

export default HowItWorks
