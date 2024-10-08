import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <div className='flex justify-center py-3'>
                <small className='text-gray-500 items-center'>
                    Proshop &copy; {currentYear}
                </small>
            </div>
        </>
    );
}

export default Footer