import "./Card.css"
export const Card = (props) => {
    return (
        <div className="block">
            {props.children}
        </div>
    );
}