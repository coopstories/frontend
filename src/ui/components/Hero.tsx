import React from 'react'
import { ReactComponent as StoriesIcon } from '../../assets/icons/stories.svg'
import useTranslations from '../../hooks/useTranslations'

const Hero: React.FC = () => {
  const t = useTranslations()

  return (
    <section className="py-6 px-5 sm:px-10 bg-secondary">
      <div
        className="
          max-w-4xl mx-auto 
          flex flex-col items-center
          sm:flex-row sm:justify-around
          "
      >
        <StoriesIcon
          className="
            h-40 sm:h-52 md:h-64 py-3
          fill-primary self-center
          "
        />

        <h2
          className="
            text-gray-50 self-center whitespace-pre
            text-4xl sm:text-5xl md:text-6xl
            leading-snug sm:leading-normal md:leading-normal
          "
        >
          {t('heading:hero', {
            mark: (value: string) => (
              <span className="bg-primary text-gray-100">{value}</span>
            ),
          })}
        </h2>
      </div>
    </section>
  )
}

export default Hero
