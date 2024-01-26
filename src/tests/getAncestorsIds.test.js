import { getAncestorsIds } from "../helpers.js";

describe("getAncestorsIds", () => {
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
  
  test("not all siblings are selected", () => {
    const selected = ['c'];
    // A 
    //    B 
    //       C ✓
    //       D
    //       E +
    //    F
    //    G

    expect(getAncestorsIds('e', example, selected)).toEqual([]);
  })

  test("select parent", () => {
    const selected = ['c', 'd', 'g'];
    // A 
    //    B 
    //       C ✓
    //       D ✓
    //       E +
    //    F
    //    G ✓

    expect(getAncestorsIds('e', example, selected)).toEqual(['b']);
  })

  test("select parent and grand parent", () => {
    const selected = ['c', 'd', 'f', 'g'];
    // A 
    //    B 
    //       C ✓
    //       D ✓
    //       E +
    //    F ✓
    //    G ✓

    expect(getAncestorsIds('e', example, selected).sort()).toEqual(['a', 'b'].sort());
  })
})
