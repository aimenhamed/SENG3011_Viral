import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Legend = () => {
    const [lvl1Expand, setLvl1Expand] = useState(false);
    const [lvl2Expand, setLvl2Expand] = useState(false);
    const [lvl3Expand, setLvl3Expand] = useState(false);
    const [lvl4Expand, setLvl4Expand] = useState(false); 

    const adviceLvls = [
        { lvlName: 'Level 1', color: '#5dbc60', subtitle: 'Exercise normal safety precautions', explanation: 'Use common sense and look out for suspicious behaviour, as you would in Australia.', id: 'lvl1'},
        { lvlName: 'Level 2', color: '#f6d34e', subtitle: 'Exercise a high degree of caution', explanation: 'Pay close attention to your personal security and the current health situation. Monitor the media for new and existing risks.', id: 'lvl2' },
        { lvlName: 'Level 3', color: '#f1902c', subtitle: 'Reconsider your need to travel', explanation: 'Avoid non-essential travel. Do your research and check that your insurer will cover you. If you do travel, take extra precautions to protect yourself from security and health risks.', id: 'lvl3' },
        { lvlName: 'Level 4', color: '#ee4142', subtitle: 'Do not travel', explanation: "If you're already in this location, you should consider leaving if it’s safe to do so. If you do travel, get professional security advice. Your travel insurance policy might be void. The Australian Government may not be able to help you.", id: 'lvl4' }
    ];

    const adviceLvlDivStyle ={
        paddingLeft: '12px',
        cursor: 'pointer',
    }

    const adviceLvlParaStyle = {
        margin: '0px',
        paddingBottom: '7px',
        paddingTop: '7px',
        cursor: 'pointer',
    }

    const setExpandCollapse = (id: string, currState: boolean, updateFunc: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (currState) {
            const moreInfoDiv = document.getElementById(`${id}InfoDiv`);
            console.log(moreInfoDiv);
        } 

        updateFunc(!currState)
    }

    const expandCollapse = (id: string) => {
        let currState: boolean;
        let updateFunc: React.Dispatch<React.SetStateAction<boolean>>;

        if (id === 'lvl1') {
            currState = lvl1Expand;
            updateFunc = setLvl1Expand;
        } else if (id === 'lvl2') {
            currState = lvl2Expand;
            updateFunc = setLvl2Expand;
        } else if (id === 'lvl3') {
            currState = lvl3Expand;
            updateFunc = setLvl3Expand;
        } else {
            currState = lvl4Expand;
            updateFunc = setLvl4Expand;
        }

        setExpandCollapse(id, currState, updateFunc);

    }

    /* Function(`${adviceLvl.id}Expand`) == true ? (
                                <div id={`${adviceLvl.id}InfoDiv`}>hello
                                </div>
                            ) : 
                            (
                                <div style={{display: 'none'}}>
                                </div>
                            ) */

    return (
        <div style={{position: 'absolute', bottom: '5vh', borderStyle: 'solid', borderWidth: '4px', borderColor: '#bdbdbd', borderRadius: '10px'}}>
            <div style={{backgroundColor: '#bdbdbd', paddingLeft: '10px', paddingRight: '10px', fontSize: 'larger'}}>
                <p style={{margin: '0px', paddingTop: '7px', paddingBottom: '7px'}}>Travel Advice Levels</p>
            </div>
            {
                adviceLvls.map((adviceLvl) => 
                    <div id={adviceLvl.id} style={Object.assign({ backgroundColor: adviceLvl.color }, adviceLvlDivStyle)} onClick={() => expandCollapse(adviceLvl.id)}> {/* eslint-disable-line */}
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesomeIcon icon={faAngleRight} />
                            <div style={{width: '10px'}}></div>
                            <p style={adviceLvlParaStyle}>{adviceLvl.lvlName}</p>
                        </div>
                        
                    </div>
                )
            }
        </div>
    );
};

export default Legend;