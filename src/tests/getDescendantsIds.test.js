import {getDescendantsIds} from "./helpers";

test("getDescendantsIds", () => {
  // A
  //    B
  //       C
  //       D
  //       E
  //    F
  //    G

  const example = {
    'a': {
      children: ['b', 'f', 'g']
    },
    'b': {
      children: ['c', 'd', 'e'],
      parentId: 'a'
    },
    'c': {
      children: [],
      parentId: 'b'
    },
    'd': {
      children: [],
      parentId: 'b'
    },
    'e': {
      children: [],
      parentId: 'b'
    },
    'f': {
      children: [],
      parentId: 'a'
    },
    'g': {
      children: [],
      parentId: 'a'
    }
  }
  // https://jestjs.io/docs/expect
  expect(getDescendantsIds('a', example).sort()).toEqual(['b', 'c', 'd', 'e', 'f', 'g'].sort());
})