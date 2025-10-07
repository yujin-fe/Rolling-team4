import {useState} from "react"

import shareBtn from "../assets/icons/Union.svg";

import Dropdown from "./Dropdown"

const ShareBtn = () => {
  const [selectedOpt, setSelectedOpt] = useState('')

  const handleSelectChange = (input) => {
    setSelectedOpt(input)
  }

  return(
    <div>
      <Dropdown data={[
        {id:1, content:"카카오톡 공유"},
        {id:2, content:"url 공유"}
      ]}
      handleSelectChange={handleSelectChange}
      value={selectedOpt}
      titleSize="sm"
      icon={shareBtn} 
      size="sm" 
      variant="outlined" />
    </div>
  )
}

export default ShareBtn;