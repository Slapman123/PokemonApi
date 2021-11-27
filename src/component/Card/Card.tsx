import React, { FC } from "react";
import { observer } from "mobx-react";
import { People } from "../../state/Models/PeopleModel";

interface ICardInterface {
  character: People;
}

export const Card: FC<ICardInterface> = observer((props: ICardInterface) => {
  const { character } = props;
  const highlight = character.setHighlight();
  return (
    <div
      className={`card ${highlight ? "card--blue" : ""} ${
        character.tallest ? "card--red" : ""
      }`}
    >
      <h2>{character.name}</h2>
      <div className="card-info">
        <h4>Info:</h4>
        <p>Eye color:{character.eye_color}</p>
        <p>Height{character.height}</p>
        <p>Birth year{character.birth}</p>
        <span>
          Number of vehicles: <strong>{character.vehicles.length}</strong>
        </span>
      </div>
    </div>
  );
});
