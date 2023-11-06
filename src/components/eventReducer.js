export const initialState = {
    searchTerm: "",
    categorySelected: "no filter",
    saveToggle: true,
    dateCheck: false,
    titleCheck: false,
    locCheck: false
}

export const ACTIONS = {
    FILTER_EVENTS: "filter-events",
    FILTER_CATS: "filter-cats",
    SHOW_SAVE: "show-save",
    EDIT_TITLE: "edit-title",
    EDIT_DESCR: "edit-description",
    EDIT_LOC: "edit-location",
    EDIT_CATS: "edit-cats",
    EDIT_START: "edit-start",
    EDIT_END: "edit-end",
    DATE_CHECK: "date-check",
    TITLE_CHECK: "title-check",
    LOC_CHECK: "location-check"
};

const eventReducer = (state, action) => {
    const { type } = action

    switch (type) {
        case ACTIONS.FILTER_EVENTS:

            return {
                ...state,
                searchTerm: action.payload
            }
        case ACTIONS.FILTER_CATS:

            return {
                ...state,
                categorySelected: action.payload
            }

        case ACTIONS.SHOW_SAVE:

            return {
                ...state,
                saveToggle: action.payload
            }

        case ACTIONS.EDIT_TITLE:

            return {
                ...state,
                editTitle: action.payload
            }

        case ACTIONS.EDIT_DESCR:

            return {
                ...state,
                editDescription: action.payload
            }

        case ACTIONS.EDIT_LOC:

            return {
                ...state,
                editLocation: action.payload
            }

        case ACTIONS.EDIT_CATS:

            return {
                ...state,
                editCats: action.payload
            }

        case ACTIONS.EDIT_START:

            return {
                ...state,
                editStart: action.payload
            }

        case ACTIONS.EDIT_END:

            return {
                ...state,
                editEnd: action.payload
            }

        case ACTIONS.DATE_CHECK:

            return {
                ...state,
                dateCheck: action.payload
            }

        case ACTIONS.TITLE_CHECK:

            return {
                ...state,
                titleCheck: action.payload
            }

        case ACTIONS.LOC_CHECK:

            return {
                ...state,
                locCheck: action.payload
            }

        default:
            return state
    }
}

export default eventReducer