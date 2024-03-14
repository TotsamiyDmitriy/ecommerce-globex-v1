import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UserType } from "../types/mainTypes"


interface authType {
	currentUser: UserType | undefined
	signModal : boolean
}


const initialState:authType = {
	currentUser : undefined,
	signModal : false
}





export const authSlice = createSlice({
	name : 'authReducer',
	initialState,
	reducers : {
		setCurrentUser : (state, action:PayloadAction<UserType>)=> {
			state.currentUser = action.payload
			state.signModal = false
		},
		setSignModal : (state, action:PayloadAction<boolean>) => {
			state.signModal = action.payload
		}
	}
})

export const {setCurrentUser, setSignModal} = authSlice.actions

export default authSlice.reducer