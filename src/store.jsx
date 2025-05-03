import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name: 'user',
  initialState: {name : 'kim', age : 20 },
  reducers : {
    changeName(state) {
      state.name = 'park';
    }
  }
})


let cart = createSlice({
  name: 'cart',
  initialState: {
    array:  [
      {id : 0, name : 'White and Black', count : 2},
      {id : 2, name : 'Grey Yordan', count : 1}
    ]
  },
  reducers : {
    changeAmount(state, action){
      const chosenProductId = action.payload
      const index = state.array.findIndex((element) => element.id == chosenProductId)
      if (index !== -1) state.array[index].count += 1
    },

    addProduct(state, action){
      const existingIds = [];
      state.array.forEach((item) => {
        existingIds.push(item.id);
      })

      let isExisting = false;
      for (const item of state.array) {
        if (item.id === action.payload.id) {
          item.count += 1
          isExisting = true
          break   
        }
      }

      if (!isExisting) {
        state.array.push({
          id: action.payload.id,
          name: action.payload.title,
          count: 1
        })
      }
    },

    removeProduct(state, action) {
      for (const item of state.array) {
        if (item.id === action.payload) {
          const index = state.array.indexOf(item)
          state.array.splice(index, 1)
          break
        }
      }
    }
  }
})

export let { changeName } = user.actions
export let { changeAmount, addProduct, removeProduct } = cart.actions

export default configureStore({
  reducer: {
    user : user.reducer,
    cart : cart.reducer
  }
}) 

