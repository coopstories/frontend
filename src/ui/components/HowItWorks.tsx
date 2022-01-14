import React from 'react'
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg'
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg'
import { ReactComponent as DocumentIcon } from '../../assets/icons/document.svg'
import useTranslations from '../../hooks/useTranslations'

const STEPS = [
  {
    IconComponent: AddIcon,
    headingTextKey: 'how-to:step1-heading',
    descriptionTextKey: 'how-to:step1-description',
  },

  {
    IconComponent: ShareIcon,
    headingTextKey: 'how-to:step2-heading',
    descriptionTextKey: 'how-to:step2-description',
  },

  {
    IconComponent: DocumentIcon,
    headingTextKey: 'how-to:step3-heading',
    descriptionTextKey: 'how-to:step3-description',
  },
]

const HowItWorks: React.FC = () => {
  const t = useTranslations()

  return (
    <section className="py-16 px-5 sm:px-10 space-y-6 bg-gray-100">
      <h3 className="text-grey-800 text-5xl text-center">
        {t('heading:how-it-works')}
      </h3>

      {STEPS.map(({ IconComponent, headingTextKey, descriptionTextKey }) => (
        <article key={headingTextKey} className="bg-primary text-gray-50 py-4 px-6 rounded-xl shadow-md max-w-2xl mx-auto">
          <h4 className="font-serif text-2xl py-3 space-x-3 flex items-center">
            <IconComponent className="h-8 w-8 inline-block" />
            <span>{t(headingTextKey)}</span>
          </h4>

          <p className="font-serif text-lg text-gray-200">
            {t(descriptionTextKey)}
          </p>
        </article>
      ))}
    </section>
  )
}

export default HowItWorks
