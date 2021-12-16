import { dummyData } from "./testData";

const Cards = () => {
  return (
    <div className="cards-container">
      {dummyData.map((card) => (
        <div className="box-container" id={card.wordId} key={card.wordId}>
          <div className="box">
            <div className="play-icon">
              <span className="icon has-text-link">
                <i className="fas fa-play"></i>
              </span>
            </div>
            <div className="delete-icon">
              <span className="icon has-text-danger">
                <i className="fas fa-trash-alt"></i>
              </span>
            </div>
            <header className="content">
              <p className="word is-size-4">
                <strong>{card.word}</strong>
                <span className="word-type is-italic is-size-7">
                  {card.type}
                </span>
              </p>
            </header>
            <div className="content definition">{card.definition}</div>
            <div className="content example is-italic">{card.example}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Cards;
