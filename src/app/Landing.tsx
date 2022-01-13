import React from 'react'
import { Link } from 'wouter'
import { CREATE_STORY } from './routes'

const Landing: React.FC = () => {
  return (
    <div>
      <p>Hello world!</p>

      <Link href={CREATE_STORY.linkTo()}>Go to story creator</Link>
    </div>
  )
}

export default Landing
