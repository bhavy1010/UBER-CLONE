import React from 'react';

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
        <div className='h-full overflow-y-auto'>

            <div className='sticky top-0 bg-white pb-3 pt-2 z-10'>

                <div className='bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-3'>

                    <div className='flex items-center gap-3'>

                        <div className='h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
                            <i className="ri-map-pin-line text-lg"></i>
                        </div>

                        <div>
                            <h3 className='font-semibold text-slate-800'>
                                Search Location
                            </h3>

                            <p className='text-sm text-slate-500'>
                                Searching for {activeField === 'pickup'
                                    ? 'pick-up location'
                                    : 'destination'}
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            {loading && (

                <div className='flex items-center justify-center py-10'>

                    <div className='text-center'>

                        <div className='animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3'></div>

                        <p className='text-slate-500 text-sm'>
                            Finding locations...
                        </p>

                    </div>

                </div>

            )}

            {error && !loading && (

                <div className='bg-red-50 border border-red-200 rounded-2xl p-4 text-red-500 text-sm'>
                    {error}
                </div>

            )}

            {!loading && !error && suggestions.length === 0 && (

                <div className='bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center'>

                    <i className="ri-search-line text-3xl text-slate-400"></i>

                    <p className='text-sm text-slate-500 mt-2'>
                        Type more characters to see suggestions
                    </p>

                </div>

            )}

            <div className='space-y-3 pb-10'>

                {suggestions.map((elem, index) => (

                    <div
                        key={`${elem.lat}-${elem.lng}-${index}`}
                        onClick={() => {

                            onSelectSuggestion(elem.name);

                            setPanelOpen(true);
                            setVehicalePanel(false);

                        }}
                        className='bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98]'
                    >

                        <div className='flex items-start gap-4'>

                            <div className='h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0'>

                                <i className="ri-map-pin-2-fill text-blue-600 text-xl"></i>

                            </div>

                            <div className='flex-1'>

                                <h4 className='font-semibold text-slate-800 leading-6'>
                                    {elem.name}
                                </h4>

                                <p className='text-sm text-slate-500 mt-1'>
                                    Tap to select this location
                                </p>

                            </div>

                            <i className="ri-arrow-right-s-line text-slate-400 text-xl"></i>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default LocationSearchPanel;