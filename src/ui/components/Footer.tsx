import React from 'react'
import useTranslations from '../../hooks/useTranslations'

const Footer: React.FC = () => {
  const t = useTranslations()

  return (
    <footer className="py-7 px-10 bg-secondary font-serif text-lg text-gray-200 text-center">
      <p>
        {t('footer:created-by', {
          link: (value: string) => (
            <a
              className="text-primary"
              href="https://monkeyandres.com"
              target="_blank"
              rel="noreferrer"
            >
              {value}
            </a>
          ),
        })}
      </p>
    </footer>
  )
}

export default Footer
