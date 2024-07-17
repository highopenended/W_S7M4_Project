import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import txt from '../i18n/index.json'

describe('Module 4 Project Tests', () => {
  const langs=['en','esp']
  for (let i = 0; i < langs.length; i++) {
    describe('English Language', () => {

      let data = txt[langs[i]]
      let texts = getEntriesByKeyPrefix(data,"TEXT")
      let labels = getEntriesByKeyPrefix(data,"LABEL")
      let placeholders = getEntriesByKeyPrefix(data,"PLACEHOLDER")

      // TEXTS
      for(let [key,val] of texts){
        test(`${key} is visible`,()=>{
          render(<App lang={langs[i]}/>)
          expect(screen.getByText(val)).toBeVisible()
        })
      }
      // LABELS
      for(let [key,val] of labels){
        test(`${key} is visible`,()=>{
          render(<App lang={langs[i]}/>)
          expect(screen.getByLabelText(val)).toBeVisible()
        })
      }
      // PLACEHOLDERS
      for(let [key,val] of placeholders){
        test(`${key} is visible`,()=>{
          render(<App lang={langs[i]}/>)
          expect(screen.getByPlaceholderText(val)).toBeVisible()
        })
      }
    })
  }


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
}
