import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

function DatePiker({setDate}) {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const handleChange = item => {
        setState([item.selection])
        setDate(item.selection.startDate.toString(),item.selection.endDate.toString())
    }
    return (
        <DateRange
            editableDateInputs={true}
            onChange={handleChange}
            moveRangeOnFirstSelection={false}
            ranges={state}
            className={'dateRangeCustomStyle'}
            rangeColors={'#E76F4B'}
            color={'#E76F4B'}
        />
    )
}

export default DatePiker;