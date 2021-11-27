import { types, Instance } from "mobx-state-tree";

// example store, replace this with your actual stores
export const PeopleModel = types
  .model("PeopleModel")
  .props({
    id: types.identifier,
    name: types.string,
    eye_color: types.string,
    height: types.number,
    birth: types.string,
    vehicles: types.array(types.string),
    tallest: types.optional(types.boolean, false),
  })
  .views((self) => ({
    setHighlight: () => {
      if (self.vehicles.length < 1) {
        return true;
      } else {
        return false;
      }
    },
  }));

export type People = Instance<typeof PeopleModel>;
