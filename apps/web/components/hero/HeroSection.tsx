
import React from 'react';

import SearchDoctor from '../SearchDoctor';

interface HeroSectionProps {
    className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {

    return (
        <section className={`bg-gradient-to-r pb-4 w-full flex flex-col from-primary/20 to-primary/80 ${className}`}>

            <div className="flex flex-col p-1  gap-8">
                {/* top content */}
                <div className='flex justify-between  h-[250px] w-full'>

                    <div className="text-primary-foreground  gap-20 max-w-1/3">
                        <h1 className="text-2xl md:text-5xl  font-bold leading-tight ">
                            Book your

                            appointment

                            <span className="text-primary-foreground/80"> online</span> with <span className="text-primary-foreground">Healt-care </span> 
                        </h1>
                    </div>

                        {/* gauche  */}
                    <div className='flex-1 flex w-full border border-red-300 h-full '>
                        <h1 className='rounded-lg'>image ici</h1>
                    </div>


                </div>

               <div className="flex flex-col md:flex-row gap-2">
      <SearchDoctor/>
               </div>

            </div>

        </section>
    );
};

export default HeroSection;