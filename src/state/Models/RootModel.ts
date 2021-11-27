import { applySnapshot, types } from "mobx-state-tree";
import { v4 as uuidv4 } from "uuid";

import { PeopleModel } from "./PeopleModel";

const URL = "https://swapi.dev/api/people/";

export const RootModel = types
  .model("RootModel")
  .props({
    name: types.string,
    isLoading: types.boolean,
    error: types.string,
    peoples: types.array(PeopleModel),
    nextPage: types.string,
    maxItem: types.number,
    currentPage: types.number,
  })
  .actions((self) => ({
    setNextPage: (next: string) => {
      applySnapshot(self, {
        ...self,
        nextPage: next,
      });
    },
    setCurrentPage: (page: number) => {
      self.currentPage = page;
    },
    async fetchPeople() {
      let tallest = 0;
      let position = 0;
      self.isLoading = true;
      const res = await fetch(URL + self.nextPage);
      const data = await res.json();
      if (data.detail) {
        applySnapshot(self, {
          ...self,
          error: data.detail,
          isLoading: false,
        });
        return null;
      }
      const heros = data.results.map((hero: any) => ({
        id: uuidv4(),
        name: hero.name,
        eye_color: hero.eye_color,
        height: parseInt(hero.height),
        birth: hero.birth_year,
        vehicles: hero.vehicles,
      }));
      heros.forEach((character: any, index: number) => {
        if (character.height > tallest) {
          tallest = character.height;
          position = index;
        }
      });
      heros[position].tallest = true;
      applySnapshot(self, {
        ...self,
        peoples: heros,
        maxItem: parseInt(data.count),
        isLoading: false,
      });
    },
  }));

export const RootModelInitialState = {
  name: "ac2a",
  isLoading: false,
  peoples: [],
  error: "",
  nextPage: "",
  maxItem: 0,
  currentPage: 0,
};
