import React, { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { useMst } from "../../state/rootStore";

interface IPagginationInterface {}

export const Paggination: FC<IPagginationInterface> = observer(
  (props: IPagginationInterface) => {
    const { root } = useMst();
    const maxPages = Math.ceil(root.maxItem / 10);
    const setCurrentPage = (e: React.UIEvent<HTMLButtonElement>) => {
      const parent = e.currentTarget.parentNode?.children;
      if (!parent) return null;
      for (let btn of parent) {
        btn.classList.remove("btn-paggination--active");
      }
      root.setNextPage(`?page=${e.currentTarget.innerHTML}`);
      e.currentTarget.classList.toggle("btn-paggination--active");
    };
    if (root.peoples.length === 0) return <div>No More Item</div>;
    return (
      <div className="paggination">
        {Array(maxPages)
          .fill(1)
          .map((el, i) => {
            return (
              <button
                className="btn-paggination"
                key={i}
                onClick={(e) => setCurrentPage(e)}
              >
                {i + 1}
              </button>
            );
          })}
      </div>
    );
  }
);
