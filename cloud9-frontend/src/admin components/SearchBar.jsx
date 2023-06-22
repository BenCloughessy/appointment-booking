import React, { useEffect, useState } from 'react';
import Datetime from 'react-datetime';
import { Input } from 'reactstrap';
import 'react-datetime/css/react-datetime.css';

const SearchBar = ({ events, eventMap, setUserAppointments, setSearching }) => {
    const [filteredEvents, setFilteredEvents] = useState(null)

    const [searchParams, setSearchParams] = useState({
        day: null,
        time: null,
        type: null,
        email: null
    })

    const updateSearchParams = (field, value) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            [field]: value
        }))
    }

    useEffect(() => {
        const filterEvents = () => {
            let filtered = [...events]

            // Search By Day
            if (searchParams.day) {
                filtered = filtered.filter(event => 
                    new Date(event.start.dateTime).toDateString() === searchParams.day._d.toDateString()
                )
                console.log("filtered day",filtered)
            }
            
            // Search By Email
            if (searchParams.email) {
                filtered = filtered.filter(event => 
                    event.description === searchParams.email
                )
            }
            setSearching(true)
            setFilteredEvents(filtered)
        }

        filterEvents()
    }, [searchParams, events])

    // Update appointments in parent component UserAppointments
    useEffect(() => {
        console.log("filtered events:", filteredEvents)
        if (filteredEvents) {
            setUserAppointments(filteredEvents)
        }
    }, [filteredEvents])

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3%'}}>
                <Datetime 
                    timeFormat={false}
                    input={false}
                    onChange={(date) => {
                        updateSearchParams('day', date)
                    }}
                    inputProps={{placeholder: 'Select a day'}}
                />
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3%'}}>
                <Input 
                    type='select'
                    placeholder='Search Emails'
                    onChange={(e) => updateSearchParams('email', e.target.value)}
                >
                    {eventMap.reduce((unique, event) => {
                        return unique.includes(event.description) ? unique : [...unique, event.description];
                    }, []).map((description, index) => (
                        <option key={index} value={description}>
                            {description}
                        </option>
                    ))}
                </Input>
            </div>
        </div>
    )
}

export default SearchBar;

