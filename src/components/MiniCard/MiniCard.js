


import './MiniCard.css';

const MiniCard = props => {
    return (
        <div id={props.card.id} className="react-kanban-card">
            <div className="board-minicard-heading"><img className="board-minicard-company-logo" src={props.card.logo} crossorigin="anonymous"/>{props.card.companyName}</div>
            <hr/>
            <div className="board-minicard-line">{props.card.jobTitle}</div>
            <div className="board-minicard-line">Applied: {props.card.date}</div>
            
        </div>
    );
};

export default MiniCard;