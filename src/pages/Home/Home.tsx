import React, { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { useMst } from "../../state/rootStore";
import { Card } from "../../component/Card/Card";
import { Paggination } from "../../component/Paggination/Paggination";
import logo from "../../assets/logo.png";

interface IHomePageInterface {}

export const Home: FC<IHomePageInterface> = observer(
  (props: IHomePageInterface) => {
    const { root } = useMst();
    useEffect(() => {
      root.fetchPeople();
    }, [root.nextPage]);
    if (root.isLoading) return <div className="spinner">Loading...</div>;
    if (root.error) return <div className="eroor">Error: {root.error}</div>;
    return (
      <div className="container">
        <div className="home">
          <img className="home-logo" src={logo} alt="img" />
          <br />
          <ul className="home-list">
            {root.peoples.map((p) => {
              return <Card character={p} key={p.id} />;
            })}
          </ul>
          <br />
          <Paggination />
        </div>
      </div>
    );
  }
);
