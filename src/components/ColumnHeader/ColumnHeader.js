
import './ColumnHeader.css';

const ColumnHeader = props => {
    return (
        <div>
            <div className="board-column-header">
                <div className="board-column-row">
                    <span className="board-column-header-content">{props.column.title}</span> 
                    <span className="board-column-header-tools" onClick={() => props.addCard(props.column.id)}>+</span>
                </div>
            </div>
        </div>
    );
};

export default ColumnHeader;