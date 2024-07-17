import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import txt from '../i18n/index.json'

describe('Module 4 Project Tests', () => {

  const langs=['en','esp']
  for (let i = 0; i < langs.length; i++) {
    let lang=langs[i]
    describe('English Language', () => {

      let data = txt[lang]

      let texts = getEntriesByKeyPrefix(data,"TEXT")
      let labels = getEntriesByKeyPrefix(data,"LABEL")
      let placeholders = getEntriesByKeyPrefix(data,"PLACEHOLDER")

      // TEXTS
      for(let [key,val] of texts){
        test(`${key} is visible`,()=>{
          render(<App lang={lang}/>)
          expect(screen.getByText(val)).toBeVisible()
        })
      }
      // LABELS
      for(let [key,val] of labels){
        test(`${key} is visible`,()=>{
          render(<App lang={lang}/>)
          expect(screen.getByLabelText(val)).toBeVisible()
        })
      }

      // PLACEHOLDERS
      for(let [key,val] of placeholders){
        test(`${key} is visible`,()=>{
          render(<App lang={lang}/>)
          expect(screen.getByPlaceholderText(val)).toBeVisible()
        })
      }
    })
  }

  // describe('English Language', () => {

  //   const data = txt['en']

  //   const texts = getEntriesByKeyPrefix(data,"TEXT")
  //   const labels = getEntriesByKeyPrefix(data,"LABEL")
  //   const placeholders = getEntriesByKeyPrefix(data,"PLACEHOLDER")

  //   // TEXTS
  //   for(let [key,val] of texts){
  //     test(`${key} is visible`,()=>{
  //       render(<App/>)
  //       expect(screen.getByText(val)).toBeVisible()
  //     })
  //   }
  //   // LABELS
  //   for(let [key,val] of labels){
  //     test(`${key} is visible`,()=>{
  //       render(<App/>)
  //       expect(screen.getByLabelText(val)).toBeVisible()
  //     })
  //   }

  //   // PLACEHOLDERS
  //   for(let [key,val] of placeholders){
  //     test(`${key} is visible`,()=>{
  //       render(<App/>)
  //       expect(screen.getByPlaceholderText(val)).toBeVisible()
  //     })
  //   }
  // })


  // describe('Spanish Language', () => {

  //   const data = txt['esp']

  //   const texts = getEntriesByKeyPrefix(data,"TEXT")
  //   const labels = getEntriesByKeyPrefix(data,"LABEL")
  //   const placeholders = getEntriesByKeyPrefix(data,"PLACEHOLDER")

  //   // TEXTS
  //   for(let [key,val] of texts){
  //     test(`${key} is visible`,()=>{
  //       render(<App lang='esp'/>)
  //       expect(screen.getByText(val)).toBeVisible()
  //     })
  //   }
  //   // LABELS
  //   for(let [key,val] of labels){
  //     test(`${key} is visible`,()=>{
  //       render(<App lang='esp'/>)
  //       expect(screen.getByLabelText(val)).toBeVisible()
  //     })
  //   }

  //   // PLACEHOLDERS
  //   for(let [key,val] of placeholders){
  //     test(`${key} is visible`,()=>{
  //       render(<App lang='esp'/>)
  //       expect(screen.getByPlaceholderText(val)).toBeVisible()
  //     })
  //   }
  // })

  // // 👉 TASK 1
  // describe('English Language', () => {

  //   const texts = getEntriesByKeyPrefix(txt.en,"TEXT")
  //   const labels = getEntriesByKeyPrefix(txt.en,"LABEL")
  //   const placeholders = getEntriesByKeyPrefix(txt.en,"PLACEHOLDER")

  //   // TEXTS
  //   for(let [key,val] of texts){
  //     test(`${key} is visible`,()=>{
  //       render(<App/>)
  //       expect(screen.getByText(val)).toBeVisible()
  //     })
  //   }
  //   // LABELS
  //   for(let [key,val] of labels){
  //     test(`${key} is visible`,()=>{
  //       render(<App/>)
  //       expect(screen.getByLabelText(val)).toBeVisible()
  //     })
  //   }

  //   // PLACEHOLDERS
  //   for(let [key,val] of placeholders){
  //     test(`${key} is visible`,()=>{
  //       render(<App/>)
  //       expect(screen.getByPlaceholderText(val)).toBeVisible()
  //     })
  //   }
  // })




  describe('getEntriesByKeyPrefix', () => {
    test('can extract the correct data', () => {
      const obj={
        abc_1:'data_abc_1',
        abc_2:'data_abc_2',
        xyz_1:'data_xyz_1',
        abc_3:'data_abc_3',
      }
      const expected=[
        ["abc_1", "data_abc_1"],
        ["abc_2", "data_abc_2"],
        ["abc_3", "data_abc_3"],
      ]
      
      expect(getEntriesByKeyPrefix(obj,"abc")).toEqual(expected)

    })
  })
})
function getEntriesByKeyPrefix(obj, keyPrefix) {

  return Object.entries(obj).filter(([key,val])=>key.split('_')[0]===keyPrefix)



  /*
    👉 TASK 4 part 1

    Implement a function that takes as first argument an object `obj` such as this:

    {
      abc_1: "data_abc_1",
      abc_2: "data_abc_2",
      xyz_1: "data_xyz_1",
      abc_3: "data_abc_3",
    }

    and takes as second argument a string `keyPrefix` such as this: "abc"

    and returns an array of arrays such as this (for the arguments given in the examples above):

    [
      ["abc_1", "data_abc_1"],
      ["abc_2", "data_abc_2"],
      ["abc_3", "data_abc_3"],
    ]

    If the function is passed the same `obj` as above but a `keyPrefix` of "xyz" then it would return:

    [
      ["xyz_1", "data_xyz_1"],
    ]

    If the function is passed the same `obj` as above but a `keyPrefix` of "foo" then it would return the empty array.

    The function looks inside the object `obj`, finds all properties whose property names begin
    with the `keyPrefix` given (followed by an underscore), and reorganizes the information before returning it.
    The properties that match the `keyPrefix` are returned inside an array holding key-value-pair sub-arrays.

  */
}
