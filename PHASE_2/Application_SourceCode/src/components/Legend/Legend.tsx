import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Collapsible from "react-collapsible";

const Legend = () => {

    const adviceLvls = [
        { lvlName: 'Level 1', color: '#5dbc60', subtitle: 'Exercise normal safety precautions', explanation: 'Use common sense and look out for suspicious behaviour, as you would in Australia.', id: 'lvl1'},
        { lvlName: 'Level 2', color: '#f6d34e', subtitle: 'Exercise a high degree of caution', explanation: 'Pay close attention to your personal security and the current health situation. Monitor the media for new and existing risks.', id: 'lvl2' },
        { lvlName: 'Level 3', color: '#f1902c', subtitle: 'Reconsider your need to travel', explanation: 'Avoid non-essential travel. Do your research and check that your insurer will cover you. If you do travel, take extra precautions to protect yourself from security and health risks.', id: 'lvl3' },
        { lvlName: 'Level 4', color: '#ee4142', subtitle: 'Do not travel', explanation: "If you're already in this location, you should consider leaving if it’s safe to do so. If you do travel, get professional security advice. Your travel insurance policy might be void. The Australian Government may not be able to help you.", id: 'lvl4' }
    ];

    const adviceLvlDivStyle ={
        padding: '12px 10px 10px 12px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
    }

    const adviceLvlParaStyle = {
        margin: '0px',
        padding: '7px',
        cursor: 'pointer',
        fontSize: 'smaller',
    }

    return (
        <div style={{position: 'absolute', bottom: '5vh', borderStyle: 'solid', borderWidth: '4px', borderColor: '#bdbdbd', borderRadius: '10px', width: '200px'}}>
            <div style={{backgroundColor: '#bdbdbd', paddingLeft: '10px', paddingRight: '10px', fontSize: 'larger'}}>
                <p style={{margin: '0px', paddingTop: '7px', paddingBottom: '7px'}}>Travel Advice Levels</p>
            </div>
            {
                adviceLvls.map((adviceLvl) => 
                    <Collapsible trigger={<div style={Object.assign({ backgroundColor: adviceLvl.color }, adviceLvlDivStyle)}>{`${adviceLvl.lvlName}`}<FontAwesomeIcon icon={faAngleRight} /></div>} > {/* eslint-disable-line */}
                        <div style={{backgroundColor: 'white'}}>
                         <p style={Object.assign({ fontWeight: '700' }, adviceLvlParaStyle)}>{adviceLvl.subtitle}</p> {/* eslint-disable-line */}
                                <p style={adviceLvlParaStyle}>{adviceLvl.explanation}</p> 
                        </div>
                    </Collapsible>
                )
            }
        </div>
    );
};

export default Legend;