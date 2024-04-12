import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { QueryType } from "../components/Filter"

export type Sort = { title: string; request: string };




type FilterState = {

	error : string
	filters : QueryType
	search : string
	tags : {
		[x: string] : string | undefined
		colors?: string,
		offers? : string,
		brandName?: string,
		sizes? : string,
		priceRange?: string;
	},
	priceRange: number[];
	sortBy : Sort;
	wishlist_id: string | undefined;
}


const initialState:FilterState = {

	error : '',
	tags : {
		colors: undefined,
		offers : undefined,
		brandName: undefined,
		sizes : undefined,
		priceRange: undefined,
	},
	filters : {
		colors: [],
		offers : [],
		brandName: [],
		sizes : [],
	},
	search : '',
	priceRange: [],
	sortBy: { title: 'Popularity', request: "toprated" },
	wishlist_id : undefined,
}

export const productSlice = createSlice({
	name : 'productReducer',
	initialState,
	reducers : {
	setFiltersState : (state, action:PayloadAction<QueryType>) => {
		state.filters = action.payload
	},
	setPriceRange : (state, action:PayloadAction<number[]>) => {
		state.priceRange = action.payload
	},
	clearAll : (state) => {
		state.filters = initialState.filters
		state.priceRange = initialState.priceRange
		state.tags = initialState.tags
		
	},
	setSortBy : (state, action:PayloadAction<Sort>) => {

		state.sortBy = action.payload

	},
	setSearch : (state, action:PayloadAction<string>) => {
		state.search = action.payload
	},

	addTag : (state, action:PayloadAction<string>) => {
		switch (action.payload) {
			case 'brandName':
				state.tags[action.payload] = `Tag for brands`
				break;
		
			case 'priceRange':
				state.tags[action.payload] = `Tag for range price`
				break;
			default:
				state.tags[action.payload] = `Tag for ${action.payload}`
				break;
		}
		
		
	},
	deleteTag : (state, action:PayloadAction<string>) => {	
		if (state.filters[action.payload].length === 0) {
		delete state.tags[action.payload]
		}
	},
	deleteByTag : (state, action:PayloadAction<string>) => {
		
		if (action.payload === 'priceRange') {
			state.priceRange = initialState.priceRange
			delete state.tags.priceRange
		} else {
		state.filters[action.payload] = initialState.filters[action.payload]
		delete state.tags[action.payload]		
		}
	},
	deleteAllTags : (state) => {
		state.tags = initialState.tags
	},
	setWishlist : (state, action:PayloadAction<string>) => {
		state.wishlist_id = action.payload
	}
	},
	/*extraReducers : (builder) => {
		builder.addCase(fetchFilters.pending, (state) => {
			state.status = StatusTypes.PENDING;
		}),
		builder.addCase(fetchFilters.rejected, (state, action) => {
			state.status = StatusTypes.REJECTED;
			
		}),
		builder.addCase(fetchFilters.fulfilled, (state, action) => {
			state.status = StatusTypes.FULFILLED;
			
		})
	}*/
})



export const {setFiltersState, setPriceRange, setSearch, clearAll, addTag, deleteTag, deleteByTag,deleteAllTags, setSortBy, setWishlist} = productSlice.actions

export default productSlice.reducer