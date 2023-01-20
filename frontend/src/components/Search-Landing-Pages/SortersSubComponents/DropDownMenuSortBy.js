import { useState } from "react";
import "./DropDownMenuSortBy.css";
import {
  faArrowAltCircleDown,
  faArrowCircleDown,
  faArrowDown,
  faArrowDown19,
  faArrowDown91,
  faArrowDownWideShort,
  faCaretDown,
  faCaretUp,
  faClose,
  faExpand,
  faMinus,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DropDownMenuSortBy({ entries, stateUpdater }) {
  const [choosen, setChoosen] = useState(entries[0][0]);
  const [expand, setExpand] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <div className="my-menu-sort-by">
      <p onClick={() => setExpand(!expand)}>
        {choosen}
        <FontAwesomeIcon icon={expand ? faCaretUp : faCaretDown} />
      </p>
      {expand &&
        entries.map((entry, i) => {
          const [name, value] = entry;

          return (
            <p
              className={selectedOption === i ? "selected" : ""}
              key={i}
              onClick={(e) => {
                setChoosen(e.currentTarget.textContent);
                setExpand(false);
                setSelectedOption(i);
                stateUpdater(value);
              }}
            >
              {name}
            </p>
          );
        })}
    </div>
  );
}


export default DropDownMenuSortBy
