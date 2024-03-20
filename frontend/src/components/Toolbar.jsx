import boldIcon from "/assets/bold.svg";
import underlineIcon from "/assets/underline.svg";
import quoteIcon from "/assets/quote_left.svg";
import alignJustifyIcon from "/assets/align_justify.svg";
import alignCenterIcon from "/assets/align_center.svg";
import alignRightIcon from "/assets/align_right.svg";
import alignLeftIcon from "/assets/align_left.svg";
// import highlight from "/assets/hashtag_key.svg";
import italicIcon from "/assets/italic.svg";

const Toolbar = ()=>{
    return (
        <div className="action-buttons">
          <button type="button">
          <img src={boldIcon} alt="" className="ico"/>
          </button>
          <button type="button">
          <img src={underlineIcon} alt="" className="ico"/>
          </button>
          <button type="button">
          <img src={italicIcon} alt="" className="ico"/>
          </button>
          <button type="button">
          <img src={quoteIcon} alt="" className="ico"/>
          </button>
          <button type="button">
          <img src={alignJustifyIcon} alt="" className="ico"/>
          </button>
          <button type="button">
          <img src={alignCenterIcon} alt="" className="ico"/>
          </button>
          <button type="button">
          <img src={alignLeftIcon} alt="" className="ico"/>
          </button>
          <button type="button">
          <img src={alignRightIcon} alt="" className="ico"/>
          </button>
        </div>
    )
}
export default Toolbar;