import React from 'react'

function Card2({ title, desc, image }) {
  return (
    <article className="flex items-center gap-4 rounded-lg border border-gray-500 p-6">
            <div>
              {image}
              <p className="text-2xl font-medium text-gray-900">{title}</p>

              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          </article>
  )
}

export default Card2