import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="py-7 px-10 bg-secondary font-serif text-lg text-gray-200 text-center">
      <p>
        Created with ❤️ by{' '}
        <a
          className="text-primary"
          href="https://monkeyandres.com"
          target="_blank"
          rel="noreferrer"
        >
          @MonkeyAndres
        </a>
      </p>
    </footer>
  )
}

export default Footer
