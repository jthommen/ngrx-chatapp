import { UiState, INITIAL_UI_STATE } from "../ui-state";
import { Action } from "@ngrx/store";
import { 
    THREAD_SELECTED_ACTION, 
    SELECT_USER_ACTION, 
    ThreadSelectedAction, 
    SelectUserAction, 
    ERROR_OCCURED_ACTION,
    ErrorOccuredAction} from "../actions";
import * as _ from "lodash";

export function uiState(state: UiState = INITIAL_UI_STATE, action: any) : UiState {

    switch(action.type){

        case THREAD_SELECTED_ACTION:
            return handleThreadSelectedAction(state, action);

        case SELECT_USER_ACTION:
            return handleSelectUserAction(state, action);

        case ERROR_OCCURED_ACTION:
            return handleErrorOccuredAction(state, action);
            
        default:
            return state;
    }
}

// Handler functions to generate the new states
function handleThreadSelectedAction(state: UiState, action: ThreadSelectedAction){
    const newUiState = _.cloneDeep(state);
    newUiState.currentThreadId = action.payload.selectedThreadId;

    return newUiState;
}

function handleSelectUserAction(state: UiState, action: SelectUserAction){
    const newUiState = _.cloneDeep(state);
    newUiState.userId = action.payload;
    newUiState.currentThreadId = undefined;

    return newUiState;
}

function handleErrorOccuredAction(state: UiState, action: ErrorOccuredAction){
    const newUiState = _.cloneDeep(state);
    newUiState.currentError = action.payload;

    return newUiState;
}
