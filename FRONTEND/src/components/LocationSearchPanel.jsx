import React from 'react'

const LocationSearchPanel = ({
    setVehicalePanel,
    setPanelOpen
}) => {

    const locations = [
        "Vidhyasharam hostel and pg,sector-25,Gandhinagar",
        "LDRP - ITR , SECTOR-15 , GANDHINAGAR",
        "RELIANCE CIRCLE , KUDASAN , GANDHINAGAR",
        "SECTOR-1 METRO STATION , GANDHINAGAR"
    ]

    return (
        <div>

            {
                locations.map((elem, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setVehicalePanel(true)
                            setPanelOpen(false)
                        }}
                        className='flex border-2 p-2 rounded-xl border-white active:border-black items-center justify-start my-2 cursor-pointer'
                    >
                        <h2 className='bg-[#eee] h-10 flex items-center justify-center w-12 rounded-full mr-3 mt-1'>
                            <i className="ri-map-pin-2-fill text-xl"></i>
                        </h2>

                        <h4 className='font-medium'>
                            {elem}
                        </h4>
                    </div>
                ))
            }

        </div>
    )
}

export default LocationSearchPanel