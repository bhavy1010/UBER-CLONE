import React from 'react'

const LocationSearchPanel = ({
    suggestions,
    loading,
    error,
    onSelectSuggestion,
    activeField,
    setVehicalePanel,
    setPanelOpen
}) => {

    return (
        <div>
            <div className=' mt-10 mb-3 px-3'>
                <p className='text-sm text-slate-500'>
                    Searching for {activeField === 'pickup' ? 'pick-up' : 'destination'} locations
                </p>
            </div>

            {loading && (
                <div className='p-4 text-sm text-slate-600'>Loading suggestions...</div>
            )}

            {error && !loading && (
                <div className='p-4 text-sm text-red-500'>{error}</div>
            )}

            {!loading && !error && suggestions.length === 0 && (
                <div className='p-4 text-sm text-slate-500'>Type more characters to see suggestions.</div>
            )}

            {suggestions.map((elem, index) => (
                <div
                    key={`${elem.lat}-${elem.lng}-${index}`}
                    onClick={() => {
                            onSelectSuggestion(elem.name);
                         setPanelOpen(true);
                        setVehicalePanel(false);
                    }}
                    className='flex border-2 p-2 rounded-xl border-white active:border-black items-center justify-start my-2 cursor-pointer'
                >
                    <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12 rounded-full mr-3 mt-1'>
                        <i className="ri-map-pin-2-fill text-xl"></i>
                    </h2>

                    <h4 className='font-medium'>
                        {elem.name}
                    </h4>
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPanel