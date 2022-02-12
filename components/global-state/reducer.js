const ACTIONS = {
    USER_LOGIN: 'USER LOGIN',
    TEAM_INFO_UPDATE: 'TEAM INFO UPDATE',
    USER_LOGOUT: 'USER LOGOUT'
}

const reducer = (state = initialState, action) => {
    const tmp = {...state};

    switch(action.type) {
        case ACTIONS.USER_LOGIN:
            tmp.userInfo = action.userInfo;
            break;

        case ACTIONS.TEAM_INFO_UPDATE:
            tmp.teamInfo = action.teamInfo;
            break;

        case ACTIONS.USER_LOGOUT:
            tmp.userInfo = null;
            tmp.teamInfo = null;
            break;

        default:
            return state;
    }

    return tmp;
}

export { ACTIONS, reducer };