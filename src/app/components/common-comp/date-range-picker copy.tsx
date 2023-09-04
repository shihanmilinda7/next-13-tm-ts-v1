// components/DateRangePicker.tsx
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Add the default styles
import "react-date-range/dist/theme/default.css"; // Add the default theme CSS
import TextInputField from "./input-fields/text-input-fields";

const DateRangePickerComponent = ({
  onDateRangeChange,
}: {
  onDateRangeChange: (startDate: string, endDate: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [dateRangeDisp, setDateRangeDisp] = useState(
    new Date().toJSON().slice(0, 10) + " / " + new Date().toJSON().slice(0, 10)
  );

  const handleSelect = (ranges: any) => {
    setDateRange([ranges.selection]);
    // console.log("ranges.selection.startDate",ranges.selection.startDate.getDate(),)
    const tmpStartDate = ranges.selection.startDate.toJSON().slice(0, 10);
    const tmpEndDate = ranges.selection.endDate.toJSON().slice(0, 10);
    const isoString = ranges.selection.startDate.toISOString();
    // console.log("isoString.split('T')[0]",isoString.split('T')[0],)
    setDateRangeDisp(tmpStartDate + " / " + tmpEndDate);
    onDateRangeChange(tmpStartDate, tmpEndDate);
  };

  const togglePicker = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="w-full px-3">
        <label
          htmlFor="date"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Date
        </label>
        <div onClick={togglePicker}>
          <input
            type="text"
            name="date"
            id="date"
            placeholder=""
            autoComplete=""
            value={dateRangeDisp}
            onChange={(e) => setDateRangeDisp(e.target.value)}
            className="w-full text-center cursor-pointer rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
      </div>
      {isOpen && (
        <DateRangePicker
          ranges={dateRange}
          onChange={handleSelect}
          showDateDisplay={false} // Hide the date display in the picker
          editableDateInputs={true} // Allow manual input of dates
        />
      )}
    </div>
  );
};

export default DateRangePickerComponent;
