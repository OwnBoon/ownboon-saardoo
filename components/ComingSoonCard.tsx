import React from 'react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const ComingSoonCard = () => {
    return (
        <div className='flex gap-4 h-full border-2 border-[#2CD3E1] p-6 rounded'>
            <CalendarDaysIcon className='w-6 h-6' />
            <span>Coming Soon</span>
        </div>
    );
};

export default ComingSoonCard;