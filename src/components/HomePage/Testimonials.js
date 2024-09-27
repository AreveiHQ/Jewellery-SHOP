import React from 'react'
import Arrow from '@/assets/Arrow.svg'
import Star from '@/assets/Star.svg'
export default function Testimonials() {
  return (
    <>
<section className="bg-gray-50">
  <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <div className="md:flex md:items-end md:justify-between">
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Read trusted reviews from our customers
        </h2>

        <p className="mt-6 max-w-lg leading-relaxed text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur praesentium natus
          sapiente commodi. Aliquid sunt tempore iste repellendus explicabo dignissimos placeat,
          autem harum dolore reprehenderit quis! Quo totam dignissimos earum.
        </p>
      </div>

      <a
        href="#"
        className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full border border-rose-600 px-5 py-3 text-rose-600 transition hover:bg-rose-600 hover:text-white hover:bg-pink-500 md:mt-0"
      >
        <span className="font-medium"> Read all reviews </span>
        <span className="w-[30px]"><Arrow/></span>
      </a>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8">
        <div>
          <div className="flex gap-0.5 text-green-500">
            <span className='w-6'><Star/></span>
            <span className='w-6'><Star/></span>

            <span className='w-6'><Star/></span>

            <span className='w-6'><Star/></span>

            <span className='w-6'><Star/></span>
          </div>

          <div className="mt-4">
            <p className="text-2xl font-bold text-rose-600 sm:text-3xl">Stayin' Alive</p>

            <p className="mt-4 leading-relaxed text-gray-700">
              No, Rose, they are not breathing. And they have no arms or legs … Where are they? You
              know what? If we come across somebody with no arms or legs, do we bother resuscitating
              them? I mean, what quality of life do we have there?
            </p>
          </div>
        </div>

        <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
          &mdash; Michael Scott
        </footer>
      </blockquote>

      <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8">
        <div>
          <div className="flex gap-0.5 text-green-500">
            <span className='w-6'><Star/></span>

            <span className='w-6'><Star/></span>

            <span className='w-6'><Star/></span>

            <span className='w-6'><Star/></span>

            <span className='w-6'><Star/></span>
          </div>

          <div className="mt-4">
            <p className="text-2xl font-bold text-rose-600 sm:text-3xl">Stayin' Alive</p>

            <p className="mt-4 leading-relaxed text-gray-700">
              No, Rose, they are not breathing. And they have no arms or legs … Where are they? You
              know what? If we come across somebody with no arms or legs, do we bother resuscitating
              them? I mean, what quality of life do we have there?
            </p>
          </div>
        </div>

        <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
          &mdash; Michael Scott
        </footer>
      </blockquote>

      <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8">
        <div>
          <div className="flex gap-0.5 text-green-500">
            <span className='w-6'><Star/></span>

            <span className='w-6'><Star/></span>

            <span className='w-6'><Star/></span>

            <span className='w-6'><Star/></span>

            <span className='w-6'><Star/></span>
          </div>

          <div className="mt-4">
            <p className="text-2xl font-bold text-rose-600 sm:text-3xl">Stayin' Alive</p>

            <p className="mt-4 leading-relaxed text-gray-700">
              No, Rose, they are not breathing. And they have no arms or legs … Where are they? You
              know what? If we come across somebody with no arms or legs, do we bother resuscitating
              them? I mean, what quality of life do we have there?
            </p>
          </div>
        </div>

        <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
          &mdash; Michael Scott
        </footer>
      </blockquote>
    </div>
  </div>
</section>
    </>
  )
}
