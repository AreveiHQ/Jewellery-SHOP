import Arrow from '@/assets/Arrow.svg'
import Star from '@/assets/Star.svg'
export default function Customers() {
    return <>
        <div className='text-xl font-semibold mt-3'>
            Customer Stories
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
            <Item/>
            <Item/>
            <Item/>
            <Item/>
        </div>
    </>
}

function Item() {
    return <>
        <div>
            <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8">
                <div>
                    
                    <div className="flex gap-0.5 text-green-500">
                        <span className='w-6'><Star /></span>
                        <span className='w-6'><Star /></span>

                        <span className='w-6'><Star /></span>

                        <span className='w-6'><Star /></span>

                        <span className='w-6'><Star /></span>
                    </div>

                    <div className="mt-4">
                        <p className="text-xl font-bold text-rose-600 sm:text-3xl">Stayin' Alive</p>

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
    </>
}