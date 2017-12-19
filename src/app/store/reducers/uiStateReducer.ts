import { UiState, INITIAL_UI_STATE } from "../ui-state";
import { Action } from "@ngrx/store";
import { 
    THREAD_SELECTED_ACTION, 
    SELECT_USER_ACTION, 
    ThreadSelectedAction, 
    SelectUserAction } from "../actions";

export function uiState(state: UiState = INITIAL_UI_STATE, action: any) : UiState {

    switch(action.type){

        case THREAD_SELECTED_ACTION:
            return handleThreadSelectedAction(state, action);

        case SELECT_USER_ACTION:
            return handleSelectUserAction(state, action);
            
        default:
            return state;
    }
}

// Handler functions to generate the new states
function handleThreadSelectedAction(state: UiState, action: ThreadSelectedAction){
    const newUiState = Object.assign({}, state);
    newUiState.currentThreadId = action.payload;

    return newUiState;
}

function handleSelectUserAction(state: UiState, action: SelectUserAction){
    const newUiState = Object.assign({}, state);
    newUiState.userId = action.payload;
    newUiState.currentThreadId = undefined;

    return newUiState;
}
